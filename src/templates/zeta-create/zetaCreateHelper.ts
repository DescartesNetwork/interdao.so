import { rpc, net } from '@sentre/senhub'
import { Connection, PublicKey } from '@solana/web3.js'
import { web3 } from '@project-serum/anchor'
import { Exchange, Network, utils } from '@zetamarkets/sdk'
import { toPublicKey } from 'sentre-web3'

export const network = net as Network
export const PROGRAM_ID =
  network === 'devnet'
    ? new PublicKey('BG3oRikW8d16YjUEmX3ZxHm9SiJzrGtMhsSR8aCw1Cd7')
    : new PublicKey('ZETAxsqBRek56DhiGXrn75yj2NHU3aYUnxvHXpkf3aD')

export type CreateInfo = {
  zetaGroup: PublicKey
  marginAccount: PublicKey
  systemProgram: PublicKey
  zetaProgram: PublicKey
}

export const zetaCreateParams = async (
  masterDaoAddress: string,
): Promise<CreateInfo> => {
  const connection = new Connection(rpc)
  await Exchange.load(
    PROGRAM_ID,
    network,
    connection,
    utils.defaultCommitment(),
    // Exchange wallet can be ignored for normal clients.
    undefined,
    // ThrottleMs - increase if you are running into rate limit issues on startup.
    0,
  )
  const masterDaoPublicKey = toPublicKey(masterDaoAddress)
  const programId = Exchange.programId
  const zetaGroup = Exchange.zetaGroupAddress
  const [marginAccount] = await utils.getMarginAccount(
    programId,
    zetaGroup,
    masterDaoPublicKey,
  )

  return {
    zetaGroup,
    marginAccount,
    systemProgram: web3.SystemProgram.programId,
    zetaProgram: programId,
  }
}
