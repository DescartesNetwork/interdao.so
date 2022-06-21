import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { AnchorProvider, Program, BN } from '@project-serum/anchor'
import { Connection, PublicKey } from '@solana/web3.js'

import { AppState } from 'app/model'
import { TemplateArg, TemplateIdl } from '../index'
import { TemplateRule } from '../core/rule'
import { rpc } from 'shared/runtime'
import SafeWallet from 'app/helpers/safeWallet'
import { isTemplateAccountWithRule } from './../index'

const DEFAULT_IX_NAME = 'ixname'
export const useParser = () => {
  const templateData = useSelector((state: AppState) => state.template.data)

  const getProgram = useCallback((templateIdl: TemplateIdl) => {
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
  }, [])

  const parserAccounts = useCallback(
    async (templateIdl: TemplateIdl): Promise<Record<string, PublicKey>> => {
      const idlAccounts = templateIdl.accounts
      const accounts: Record<string, PublicKey> = {}
      for (const idlAccount of idlAccounts) {
        // Build pubkey with template rule
        if (isTemplateAccountWithRule(idlAccount)) {
          const pubkey = await TemplateRule[idlAccount.rule.name].call({
            ...idlAccount.rule.data,
          })
          accounts[idlAccount.name] = pubkey
        } else {
          // Build normal pubkey
          accounts[idlAccount.name] = new PublicKey(
            templateData[idlAccount.name],
          )
        }
      }
      return accounts
    },
    [templateData],
  )

  const parserArg = useCallback((val: string, type: TemplateArg['type']) => {
    switch (type) {
      case 'u8':
        return Number(val)
      case 'u64':
        return new BN(val)
      default:
        throw new Error('Invalid type of arg: ' + type)
    }
  }, [])

  const parserArgs = useCallback(
    async (templateIdl: TemplateIdl) => {
      const args: any[] = []
      for (const arg of templateIdl.args) {
        const val = templateData[arg.name]
        args.push(parserArg(val, arg.type))
      }
      return args
    },
    [parserArg, templateData],
  )

  const parserIxDataNoPrefix = useCallback(
    async (templateIdl: TemplateIdl) => {
      const program = await getProgram(templateIdl)
      const accounts = await parserAccounts(templateIdl)
      const args = await parserArgs(templateIdl)
      console.log('accounts', accounts)
      console.log('args', args)
      const ix = await program.methods[DEFAULT_IX_NAME].call(this, ...args)
        .accounts(accounts)
        .instruction()
      // Ignore Anchor Prefix
      ix.data = ix.data.slice(8, ix.data.length)
      return ix
    },
    [getProgram, parserAccounts, parserArgs],
  )

  return { parserIxDataNoPrefix }
}
