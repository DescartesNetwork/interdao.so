import { PublicKey } from '@solana/web3.js'

export type ProposalDataType = Buffer | Uint8Array
export type ProposalAccountType = {
  pubkey: PublicKey
  isWritable: boolean
  isSigner: boolean
  isMaster: boolean
}
export type ProposalReturnType = {
  name: string
  data: ProposalDataType
  accounts: Record<string, ProposalAccountType>
  programId: PublicKey
}
