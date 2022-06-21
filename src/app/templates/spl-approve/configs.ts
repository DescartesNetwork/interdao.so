import { utils } from '@project-serum/anchor'
import { TemplateIdl } from '../index'

export enum SplApproveIds {
  // Accounts
  source = 'source',
  delegate = 'delegate',
  authority = 'authority',
  // Prams
  code = 'code',
  amount = 'amount',
  // Context
  mint = 'mint',
}

export const SplApproveIdl: TemplateIdl = {
  name: 'spl-approve',
  accounts: [
    {
      name: SplApproveIds.source,
      isMut: true,
      isSigner: false,
      isMaster: false,
      rule: {
        name: 'token-account',
        configs: { mint: SplApproveIds.mint, owner: SplApproveIds.source },
      },
    },
    {
      name: SplApproveIds.delegate,
      isMut: true,
      isSigner: false,
      isMaster: false,
    },
    {
      name: SplApproveIds.authority,
      isMut: true,
      isSigner: true,
      isMaster: true,
    },
  ],
  args: [
    { name: SplApproveIds.code, type: 'u8' },
    { name: SplApproveIds.amount, type: 'u64' },
  ],
  programId: utils.token.TOKEN_PROGRAM_ID.toBase58(),
}
