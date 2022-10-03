import { AnchorProvider, Program, BN, web3 } from '@project-serum/anchor'
import {
  AccountMeta,
  Connection,
  PublicKey,
  TransactionInstruction,
} from '@solana/web3.js'

import { rpc } from '@sentre/senhub'
import {
  isTemplateAccountWithRule,
  isTemplateArgWithRule,
  TemplateArg,
  TemplateIdl,
} from 'templates'
import { TEMPLATE_RULES } from './rule'
import { ProposalAccountType, ProposalReturnType } from 'view/templates/types'
import { TEMPLATE_PROGRAMS } from 'templates/programs'
import { IdlInstruction } from '@project-serum/anchor/dist/cjs/idl'

const ANCHOR_PREFIX_SIZE = 8

export type IdlAccount = {
  name: string
  isMut: boolean
  isSigner: boolean
}

export const parserTemplateInstructionData = (
  programId: string,
  ixName: string,
  templateData: Record<string, string>,
): {
  ixData: Buffer
  accountMetas: web3.AccountMeta[]
} | null => {
  // Get configs
  const programAdaptor = TEMPLATE_PROGRAMS[programId]
  if (!programAdaptor) {
    console.log('Cant not find TEMPLATE_PROGRAMS with Program ID: ', programId)
    return null
  }
  const { coder, idl } = programAdaptor
  const ixIdl = idl.instructions.find((ix) => ix.name === ixName)
  if (!ixIdl) {
    console.log('Invalid ixIdl with ixName: ', ixName)
    return null
  }
  const ixAccountsIdl = ixIdl.accounts as IdlAccount[]
  // Parser IxData
  const ixData = coder.encode(ixName, templateData)
  // Parser Accounts Data
  const accountMetas: web3.AccountMeta[] = ixAccountsIdl.map((acc) => {
    const templateAccount = templateData[acc.name]
    return {
      pubkey: new web3.PublicKey(templateAccount),
      isSigner: acc.isSigner,
      isWritable: acc.isMut,
    }
  })
  return {
    ixData,
    accountMetas,
  }
}

// const parserAccounts = async (
//   programId: string,
//   templateData: Record<string, string>,
// ): Promise<Record<string, PublicKey>> => {
//   const idlAccounts = templateIdl.accounts
//   const accounts: Record<string, PublicKey> = {}
//   for (const idlAccount of idlAccounts) {
//     // Build pubkey with template rule
//     if (isTemplateAccountWithRule(idlAccount)) {
//       const ruleConfig = idlAccount.rule.configs
//       const ruleData: any = {}
//       for (const key in ruleConfig) // @ts-ignore
//         ruleData[key] = templateData[ruleConfig[key]]
//       const pubkey: any = await TEMPLATE_RULES[idlAccount.rule.name].call({
//         ...ruleData,
//       })
//       accounts[idlAccount.name] = pubkey
//     } else {
//       accounts[idlAccount.name] = new PublicKey(templateData[idlAccount.name])
//     }
//   }
//   return accounts
// }

// const parserArg = (val: string, type: TemplateArg['type']) => {
//   switch (type) {
//     case 'u8':
//       return Number(val)
//     case 'u32':
//       return Number(val)
//     case 'u64':
//       return new BN(val)
//     default:
//       throw new Error('Invalid type of arg: ' + type)
//   }
// }

// const parserArgs = async (
//   templateIdl: TemplateIdl,
//   templateData: Record<string, string>,
// ) => {
//   const args: any[] = []
//   for (const arg of templateIdl.args) {
//     let val: any = templateData[arg.name]
//     if (isTemplateArgWithRule(arg)) {
//       const ruleConfig = arg.rule.configs
//       const ruleData: any = {}
//       for (const key in ruleConfig) // @ts-ignore
//         ruleData[key] = templateData[ruleConfig[key]]
//       val = await TEMPLATE_RULES[arg.rule.name].call({
//         ...ruleData,
//       })
//     }
//     args.push(parserArg(val, arg.type))
//   }
//   return args
// }

// export const parserIxData = async (
//   templateIdl: TemplateIdl,
//   templateData: Record<string, string>,
// ) => {
//   const program = await getProgram(templateIdl)
//   const accounts = await parserAccounts(templateIdl, templateData)
//   const args = await parserArgs(templateIdl, templateData)
//   const ix = await program.methods[templateIdl.ixName]
//     .call(this, ...args)
//     .accounts(accounts)
//     .instruction()
//   if (!templateIdl.anchor)
//     ix.data = ix.data.slice(ANCHOR_PREFIX_SIZE, ix.data.length)

//   return ix
// }

// export const parserProposalReturnType = (
//   templateIdl: TemplateIdl,
//   ix: TransactionInstruction,
// ): ProposalReturnType => {
//   const accounts: Record<string, ProposalAccountType> = {}
//   for (let i = 0; i < templateIdl.accounts.length; i++) {
//     const idlAcc = templateIdl.accounts[i]
//     accounts[idlAcc.name] = {
//       isMaster: idlAcc.isMaster,
//       isSigner: idlAcc.isSigner,
//       isWritable: idlAcc.isMut,
//       pubkey: ix.keys[i].pubkey,
//     }
//   }

//   const proposalReturnType: ProposalReturnType = {
//     name: templateIdl.name,
//     data: ix.data,
//     accounts,
//     programId: new PublicKey(templateIdl.programId),
//   }
//   return proposalReturnType
// }
