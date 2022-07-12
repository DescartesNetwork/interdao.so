import { TOKEN_PROGRAM_ID } from '@project-serum/anchor/dist/cjs/utils/token'
import { rpc, net } from '@sentre/senhub'
import { Connection, PublicKey } from '@solana/web3.js'
import { Exchange, Network, utils } from '@zetamarkets/sdk'
import { toPublicKey } from 'sentre-web3'

const NETWORK_URL = rpc
// const SERVER_URL = 'https://server.zeta.markets'
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
  const walletAddress = await window.sentre.wallet.getAddress()
  // const client = await Client.load(
  //   connection,
  //   {
  //     publicKey: toPublicKey(walletAddress),
  //     ...window.sentre.wallet,
  //   },
  //   utils.defaultCommitment(),
  //   undefined,
  // )
  const amountDeposit = utils.convertDecimalToNativeInteger(10_000)
  console.log('amountDeposit: ', amountDeposit)
  const masterDaoPublicKey = toPublicKey(masterDaoAddress)
  const programId = Exchange.programId
  const zetaGroup = Exchange.zetaGroupAddress
  const [marginAccount] = await utils.getMarginAccount(
    programId,
    zetaGroup,
    toPublicKey(walletAddress),
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

  console.log('masterDaoAddress: ', masterDaoPublicKey.toBase58())
  console.log('programID: ', programId.toBase58())
  console.log('zetaGroup: ', zetaGroup.toBase58())
  console.log('marginAccount: ', marginAccount.toBase58())
  console.log('vault: ', vault.toBase58())
  console.log('userTokenAccount: ', userTokenAccount.toBase58())
  console.log('socializedLossAccount: ', socializedLossAccount.toBase58())
  console.log('authority: ', authority.toBase58())
  console.log('tokenProgram: ', tokenProgram.toBase58())
  console.log('state: ', state.toBase58())
  console.log('greeks', greeks.toBase58())
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

export const zetaCreateParams = async (
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

  // const client = await Client.load(
  //   connection,
  //   {
  //     publicKey: toPublicKey(walletAddress),
  //     ...window.sentre.wallet,
  //   },
  //   utils.defaultCommitment(),
  //   undefined,
  // )
  const amountDeposit = utils.convertDecimalToNativeInteger(10_000)
  console.log('amountDeposit: ', amountDeposit)
  const masterDaoPublicKey = toPublicKey(masterDaoAddress)
  const programId = Exchange.programId
  const zetaGroup = Exchange.zetaGroupAddress
  const [marginAccount] = await utils.getMarginAccount(
    programId,
    zetaGroup,
    toPublicKey(masterDaoAddress),
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

  console.log('masterDaoAddress: ', masterDaoPublicKey.toBase58())
  console.log('programID: ', programId.toBase58())
  console.log('zetaGroup: ', zetaGroup.toBase58())
  console.log('marginAccount: ', marginAccount.toBase58())
  console.log('vault: ', vault.toBase58())
  console.log('userTokenAccount: ', userTokenAccount.toBase58())
  console.log('socializedLossAccount: ', socializedLossAccount.toBase58())
  console.log('authority: ', authority.toBase58())
  console.log('tokenProgram: ', tokenProgram.toBase58())
  console.log('state: ', state.toBase58())
  console.log('greeks', greeks.toBase58())
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
