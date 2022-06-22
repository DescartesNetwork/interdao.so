import { AnchorProvider, Program, BN } from '@project-serum/anchor'
import { Connection, PublicKey, TransactionInstruction } from '@solana/web3.js'

import { rpc } from 'shared/runtime'
import SafeWallet from 'app/helpers/safeWallet'
import {
  isTemplateAccountWithRule,
  isTemplateArgWithRule,
  TemplateArg,
  TemplateIdl,
} from 'app/templates'
import { TEMPLATE_RULES } from './rule'
import {
  ProposalAccountType,
  ProposalReturnType,
} from 'app/view/templates/types'

const DEFAULT_IX_NAME = 'ixname'
const ANCHOR_PREFIX_SIZE = 8

const getProgram = (templateIdl: TemplateIdl) => {
  const connection = new Connection(rpc, { commitment: 'confirmed' })
  const provider = new AnchorProvider(connection, new SafeWallet(), {
    commitment: 'confirmed',
  })
  return new Program(
    {
      instructions: [
        {
          name: DEFAULT_IX_NAME,
          accounts: templateIdl.accounts,
          args: templateIdl.args,
        },
      ],
      name: 'program-parser',
      version: '0.0.0',
    },
    templateIdl.programId,
    provider,
  )
}

const parserAccounts = async (
  templateIdl: TemplateIdl,
  templateData: Record<string, string>,
): Promise<Record<string, PublicKey>> => {
  const idlAccounts = templateIdl.accounts
  const accounts: Record<string, PublicKey> = {}
  for (const idlAccount of idlAccounts) {
    // Build pubkey with template rule
    if (isTemplateAccountWithRule(idlAccount)) {
      const ruleConfig = idlAccount.rule.configs
      const ruleData: any = {}
      for (const key in ruleConfig) // @ts-ignore
        ruleData[key] = templateData[ruleConfig[key]]
      const pubkey: any = await TEMPLATE_RULES[idlAccount.rule.name].call({
        ...ruleData,
      })
      accounts[idlAccount.name] = pubkey
    } else {
      accounts[idlAccount.name] = new PublicKey(templateData[idlAccount.name])
    }
  }
  return accounts
}

const parserArg = (val: string, type: TemplateArg['type']) => {
  switch (type) {
    case 'u8':
      return Number(val)
    case 'u64':
      return new BN(val)
    default:
      throw new Error('Invalid type of arg: ' + type)
  }
}

const parserArgs = async (
  templateIdl: TemplateIdl,
  templateData: Record<string, string>,
) => {
  const args: any[] = []
  for (const arg of templateIdl.args) {
    let val: any = templateData[arg.name]
    if (isTemplateArgWithRule(arg)) {
      const ruleConfig = arg.rule.configs
      const ruleData: any = {}
      for (const key in ruleConfig) // @ts-ignore
        ruleData[key] = templateData[ruleConfig[key]]
      val = await TEMPLATE_RULES[arg.rule.name].call({
        ...ruleData,
      })
    }
    args.push(parserArg(val, arg.type))
  }
  return args
}

export const parserIxDataNoPrefix = async (
  templateIdl: TemplateIdl,
  templateData: Record<string, string>,
) => {
  const program = await getProgram(templateIdl)
  const accounts = await parserAccounts(templateIdl, templateData)
  const args = await parserArgs(templateIdl, templateData)
  const ix = await program.methods[DEFAULT_IX_NAME].call(this, ...args)
    .accounts(accounts)
    .instruction()
  ix.data = ix.data.slice(ANCHOR_PREFIX_SIZE, ix.data.length)
  return ix
}

export const parserProposalReturnType = (
  templateIdl: TemplateIdl,
  ix: TransactionInstruction,
): ProposalReturnType => {
  const accounts: Record<string, ProposalAccountType> = {}
  for (let i = 0; i < templateIdl.accounts.length; i++) {
    const idlAcc = templateIdl.accounts[i]
    accounts[idlAcc.name] = {
      isMaster: idlAcc.isMaster,
      isSigner: idlAcc.isSigner,
      isWritable: idlAcc.isMut,
      pubkey: ix.keys[i].pubkey,
    }
  }

  const proposalReturnType: ProposalReturnType = {
    name: '',
    data: ix.data,
    accounts: {},
    programId: new PublicKey(templateIdl.programId),
  }
  return proposalReturnType
}
