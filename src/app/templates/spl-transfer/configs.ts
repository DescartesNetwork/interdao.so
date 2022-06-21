import { utils } from '@project-serum/anchor'
import { TemplateIdl } from './../index'

export enum SplTransferIds {
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

export const SplTransferIdl: TemplateIdl = {
  name: 'spl-transfer',
  accounts: [
    {
      name: SplTransferIds.source,
      isMut: true,
      isSigner: false,
      isMaster: false,
      rule: {
        name: 'token-account',
        configs: { mint: SplTransferIds.mint, owner: SplTransferIds.source },
      },
    },
    {
      name: SplTransferIds.destination,
      isMut: true,
      isSigner: false,
      isMaster: false,
      rule: {
        name: 'token-account',
        configs: {
          mint: SplTransferIds.mint,
          owner: SplTransferIds.destination,
        },
      },
    },
    {
      name: SplTransferIds.authority,
      isMut: true,
      isSigner: true,
      isMaster: true,
    },
  ],
  args: [
    { name: SplTransferIds.code, type: 'u8' },
    { name: SplTransferIds.amount, type: 'u64' },
  ],
  programId: utils.token.TOKEN_PROGRAM_ID.toBase58(),
}
