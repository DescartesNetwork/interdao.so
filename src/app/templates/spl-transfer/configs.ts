import { utils } from '@project-serum/anchor'
import { TemplateIdl } from './../index'

export enum SplTransferIds {
  // Accounts
  'src' = 'src',
  'dst' = 'dst',
  'payer' = 'payer',
  // Prams
  'code' = 'code',
  'amount' = 'amount',
  // Context
  'mint' = 'mint',
}

export const SplTransferIdl: TemplateIdl = {
  name: 'spl_transfer',
  accounts: [
    {
      name: SplTransferIds.src,
      isMut: true,
      isSigner: false,
      isMaster: false,
      rule: {
        name: 'token-account',
        configs: { mint: SplTransferIds.mint, owner: SplTransferIds.src },
      },
    },
    {
      name: SplTransferIds.dst,
      isMut: true,
      isSigner: false,
      isMaster: false,
      rule: {
        name: 'token-account',
        configs: { mint: SplTransferIds.mint, owner: SplTransferIds.dst },
      },
    },
    {
      name: SplTransferIds.payer,
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
