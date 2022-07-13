import { TOKEN_PROGRAM_ID } from '@project-serum/anchor/dist/cjs/utils/token'
import { rpc, net } from '@sentre/senhub'
import { Connection, PublicKey } from '@solana/web3.js'
import { Exchange, Network, utils } from '@zetamarkets/sdk'
import { toPublicKey } from 'sentre-web3'

const NETWORK_URL = rpc
const PROGRAM_ID = new PublicKey('BG3oRikW8d16YjUEmX3ZxHm9SiJzrGtMhsSR8aCw1Cd7')

export type DepositInfo = {
  zetaGroup: PublicKey
  marginAccount: PublicKey
  vault: PublicKey
  userTokenAccount: PublicKey
  socializedLossAccount: PublicKey
  authority: PublicKey
  tokenProgram: PublicKey
  state: PublicKey
  greeks: PublicKey
}

export const zetaDepositParams = async (
  masterDaoAddress: string,
): Promise<DepositInfo> => {
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
  const vault = Exchange.vaultAddress
  const userTokenAccount = await utils.getAssociatedTokenAddress(
    Exchange.usdcMintAddress,
    masterDaoPublicKey,
  )

  const socializedLossAccount = Exchange.socializedLossAccountAddress
  const authority = masterDaoPublicKey
  const tokenProgram = TOKEN_PROGRAM_ID
  const state = Exchange.stateAddress
  const greeks = Exchange.zetaGroup.greeks

  return {
    zetaGroup: zetaGroup,
    marginAccount,
    vault,
    userTokenAccount,
    socializedLossAccount,
    authority,
    tokenProgram,
    state,
    greeks,
  }
}
