import { rpc, net } from '@sentre/senhub'
import { Connection, PublicKey } from '@solana/web3.js'
import { web3 } from '@project-serum/anchor'
import { Exchange, Network, utils } from '@zetamarkets/sdk'
import { toPublicKey } from 'sentre-web3'

const NETWORK_URL = rpc
const PROGRAM_ID = new PublicKey('BG3oRikW8d16YjUEmX3ZxHm9SiJzrGtMhsSR8aCw1Cd7')

export type CreateInfo = {
  zetaGroup: PublicKey
  marginAccount: PublicKey
  systemProgram: PublicKey
  zetaProgram: PublicKey
}

export const zetaCreateParams = async (
  masterDaoAddress: string,
): Promise<CreateInfo> => {
  const connection = new Connection(NETWORK_URL)
  await Exchange.load(
    PROGRAM_ID,
    net as Network,
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
    zetaGroup: zetaGroup,
    marginAccount,
    systemProgram: web3.SystemProgram.programId,
    zetaProgram: PROGRAM_ID,
  }
}
