import { utils } from '@project-serum/anchor'
import { RulesName } from '../core/rule'
import { TemplateIdl, TemplateNames } from './../index'

export enum ZetaDepositIds {
  // Accounts
  source = 'source',
  destination = 'destination',
  authority = 'authority',
  // Prams
  code = 'code',
  amount = 'amount',
  // Context
  mint = 'mint',
}

export const ZetaDepositIdl: TemplateIdl = {
  name: TemplateNames.ZetaDeposit,
  accounts: [
    {
      name: ZetaDepositIds.source,
      isMut: true,
      isSigner: false,
      isMaster: false,
      rule: {
        name: RulesName.tokenAccount,
        configs: { mint: ZetaDepositIds.mint, owner: ZetaDepositIds.source },
      },
    },
    {
      name: ZetaDepositIds.destination,
      isMut: true,
      isSigner: false,
      isMaster: false,
      rule: {
        name: RulesName.tokenAccount,
        configs: {
          mint: ZetaDepositIds.mint,
          owner: ZetaDepositIds.destination,
        },
      },
    },
    {
      name: ZetaDepositIds.authority,
      isMut: true,
      isSigner: true,
      isMaster: true,
    },
  ],
  args: [
    { name: ZetaDepositIds.code, type: 'u8' },
    {
      name: ZetaDepositIds.amount,
      type: 'u64',
      rule: {
        name: RulesName.decimalize,
        configs: {
          amount: ZetaDepositIds.amount,
          mint: ZetaDepositIds.mint,
        },
      },
    },
  ],
  programId: utils.token.TOKEN_PROGRAM_ID.toBase58(),
}
