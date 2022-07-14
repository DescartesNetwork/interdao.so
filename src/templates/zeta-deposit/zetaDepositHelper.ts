import { utils as anchorUtils } from '@project-serum/anchor'
import { rpc } from '@sentre/senhub'
import { Connection, PublicKey } from '@solana/web3.js'
import { Exchange, utils } from '@zetamarkets/sdk'
import { toPublicKey } from 'sentre-web3'
import { PROGRAM_ID, network } from '../zeta-create/zetaCreateHelper'

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
  const vault = Exchange.vaultAddress
  const userTokenAccount = await utils.getAssociatedTokenAddress(
    Exchange.usdcMintAddress,
    masterDaoPublicKey,
  )
  const socializedLossAccount = Exchange.socializedLossAccountAddress
  const authority = masterDaoPublicKey
  const tokenProgram = anchorUtils.token.TOKEN_PROGRAM_ID
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
