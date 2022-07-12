import { RulesName } from '../core/rule'
import { TemplateIdl, TemplateNames } from './../index'

export enum ZetaDepositIds {
  // Accounts
  zetaGroup = 'zetaGroup',
  marginAccount = 'marginAccount',
  vault = 'vault',
  userTokenAccount = 'userTokenAccount',
  socializedLossAccount = 'socializedLossAccount',
  authority = 'authority',
  tokenProgram = 'tokenProgram',
  state = 'state',
  greeks = 'greeks',
  // Params
  amount = 'amount',
  // Context
  mint = 'mint',
}

export const ZetaDepositIdl: TemplateIdl = {
  name: TemplateNames.ZetaDeposit,
  accounts: [
    {
      name: ZetaDepositIds.zetaGroup,
      isMut: false,
      isSigner: false,
      isMaster: false,
    },
    {
      name: ZetaDepositIds.marginAccount,
      isMut: true,
      isSigner: false,
      isMaster: false,
    },
    {
      name: ZetaDepositIds.vault,
      isMut: true,
      isSigner: false,
      isMaster: false,
    },
    {
      name: ZetaDepositIds.userTokenAccount,
      isMut: true,
      isSigner: false,
      isMaster: false,
    },
    {
      name: ZetaDepositIds.socializedLossAccount,
      isMut: true,
      isSigner: false,
      isMaster: false,
    },
    {
      name: ZetaDepositIds.authority,
      isMut: false,
      isSigner: true,
      isMaster: true,
    },
    {
      name: ZetaDepositIds.tokenProgram,
      isMut: false,
      isSigner: false,
      isMaster: false,
    },
    {
      name: ZetaDepositIds.state,
      isMut: false,
      isSigner: false,
      isMaster: false,
    },
    {
      name: ZetaDepositIds.greeks,
      isMut: false,
      isSigner: false,
      isMaster: false,
    },
  ],
  args: [
    {
      name: ZetaDepositIds.amount,
      type: 'u64',
      rule: {
        name: RulesName.zetaAmount,
        configs: {
          amount: ZetaDepositIds.amount,
        },
      },
    },
  ],
  programId: 'BG3oRikW8d16YjUEmX3ZxHm9SiJzrGtMhsSR8aCw1Cd7',
}
