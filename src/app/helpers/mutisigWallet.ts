import { DEFAULT_EMPTY_ADDRESS } from '@senswap/sen-js'
import { ASSOCIATED_TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { Spl, AnchorProvider, web3, BN, utils } from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'
import { FeeOptions, isAddress } from '@sentre/utility'

import configs from 'app/configs'
import SafeWallet from 'app/helpers/safeWallet'
import { rpc } from 'shared/runtime'

const {
  sol: { utility },
} = configs

const DEFAULT_DECIMALS = 9

class MultisigWallet {
  private _mint: PublicKey

  constructor(mintAddress: string) {
    this._mint = new PublicKey(mintAddress)
  }

  initializeMint = async (
    decimals: number,
    token: web3.Keypair,
    provider: AnchorProvider,
  ) => {
    const spl = Spl.token()
    const ix = await (spl.account as any).mint.createInstruction(token)
    const tx = new web3.Transaction().add(ix)
    tx.add(
      spl.instruction.initializeMint(
        decimals,
        provider.wallet.publicKey,
        provider.wallet.publicKey,
        {
          accounts: {
            mint: token.publicKey,
            rent: web3.SYSVAR_RENT_PUBKEY,
          },
          signers: [],
        },
      ),
    )
    return provider.sendAndConfirm(tx, [token])
  }

  getProvider = async () => {
    const connection = new web3.Connection(rpc, 'confirmed')
    const anchorProvider = new AnchorProvider(connection, new SafeWallet(), {
      commitment: 'confirmed',
      skipPreflight: true,
    })
    return anchorProvider
  }

  createNewTokenAndMintTo = async (walletAddress: string, amount: number) => {
    const mint = new web3.Keypair()
    const provider = await this.getProvider()

    const spl = Spl.token()
    // Create Mint Instruction
    const ix = await (spl.account as any).mint.createInstruction(mint)
    const tx = new web3.Transaction().add(ix)
    const dstAddress = await utils.token.associatedAddress({
      owner: new PublicKey(walletAddress),
      mint: mint.publicKey,
    })
    tx.add(
      spl.instruction.initializeMint(
        DEFAULT_DECIMALS,
        provider.wallet.publicKey,
        provider.wallet.publicKey,
        {
          accounts: {
            mint: mint.publicKey,
            rent: web3.SYSVAR_RENT_PUBKEY,
          },
        },
      ),
    )
    // Mint to instruction
    const mintToIx = await utility.program.methods
      .safeMintTo(new BN(amount), new BN(0))
      .accounts({
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        authority: new PublicKey(walletAddress),
        dst: dstAddress,
        feeCollector: new PublicKey(walletAddress),
        mint: mint.publicKey,
        payer: new PublicKey(walletAddress),
        rent: web3.SYSVAR_RENT_PUBKEY,
        systemProgram: web3.SystemProgram.programId,
        tokenProgram: utils.token.TOKEN_PROGRAM_ID,
      })
      .instruction()
    tx.add(mintToIx)

    await provider.sendAndConfirm(tx, [mint])
    this._mint = mint.publicKey
    return mint.publicKey.toBase58()
  }

  isValidMint = (): boolean => this._mint.toBase58() !== DEFAULT_EMPTY_ADDRESS

  mintToAccount = async (dstAddress: string, amount: number) => {
    if (!this.isValidMint()) throw new Error('Please create mint first!')
    await utility.safeMintTo({
      amount: new BN(amount),
      tokenAddress: this._mint.toBase58(),
      dstWalletAddress: dstAddress,
    })
  }

  wrapSafeMintTo = async ({
    amount,
    tokenAddress,
    dstWalletAddress,
    feeOptions,
  }: {
    amount: BN
    tokenAddress: string
    dstWalletAddress: string
    feeOptions: FeeOptions
  }) => {
    const provider = await this.getProvider()
    const { fee, feeCollectorAddress } = feeOptions
    if (!isAddress(feeCollectorAddress))
      throw new Error('Invalid fee collector address')
    if (amount.isNeg()) throw new Error('Token amount must not be negative')
    if (!isAddress(tokenAddress)) throw new Error('Invalid token address')
    if (!isAddress(dstWalletAddress))
      throw new Error('Invalid destination wallet address')

    const tokenPublicKey = new web3.PublicKey(tokenAddress)
    const dstWalletPublicKey = new web3.PublicKey(dstWalletAddress)
    const dstPublicKey = await utils.token.associatedAddress({
      mint: tokenPublicKey,
      owner: dstWalletPublicKey,
    })

    const txId = await utility.program.instruction.safeMintTo(amount, fee, {
      accounts: {
        payer: provider.wallet.publicKey,
        authority: dstWalletPublicKey,
        dst: dstPublicKey,
        feeCollector: new web3.PublicKey(feeCollectorAddress),
        mint: tokenPublicKey,
        tokenProgram: utils.token.TOKEN_PROGRAM_ID,
        associatedTokenProgram: utils.token.ASSOCIATED_PROGRAM_ID,
        systemProgram: web3.SystemProgram.programId,
        rent: web3.SYSVAR_RENT_PUBKEY,
      },
    })

    return txId
  }

  burnAccount = async (
    authority: PublicKey,
    mint: PublicKey,
    source: PublicKey,
  ) => {
    await this.getProvider()
    const spl = Spl.token()
    const tokenAccount = await utils.token.associatedAddress({
      mint: mint,
      owner: source,
    })

    await spl.rpc.burn(new BN(1), {
      accounts: {
        source: tokenAccount,
        mint,
        authority,
      },
    })
  }

  getMintAddress = (): string => {
    if (!this.isValidMint()) return ''
    return this._mint.toBase58()
  }
}
export default MultisigWallet
