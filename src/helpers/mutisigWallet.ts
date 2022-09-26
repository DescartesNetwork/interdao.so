import { DEFAULT_EMPTY_ADDRESS } from '@senswap/sen-js'
import { web3, BN } from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'
import { createMintAndMintTo, getAnchorProvider } from 'sentre-web3'
import { rpc } from '@sentre/senhub'

class MultisigWallet {
  private _mint: PublicKey

  constructor(mintAddress: string) {
    this._mint = new PublicKey(mintAddress)
  }

  getProvider = async () => {
    const wallet = window.sentre.wallet
    const walletAddress = await wallet.getAddress()
    return getAnchorProvider(rpc, walletAddress, wallet)
  }

  createNewTokenAndMintTo = async (number: number) => {
    const mint = new web3.Keypair()
    const provider = await this.getProvider()
    await createMintAndMintTo(provider, {
      mint,
      amount: new BN(number),
      decimals: 0,
    })
    this._mint = mint.publicKey
    return mint.publicKey
  }

  isValidMint = (): boolean => this._mint.toBase58() !== DEFAULT_EMPTY_ADDRESS

  mintToAccount = async (dstAddress: string, amount: number) => {
    if (!this.isValidMint()) throw new Error('Please create mint first!')
    await window.senUtility.safeMintTo({
      amount: new BN(amount),
      tokenAddress: this._mint.toBase58(),
      dstWalletAddress: dstAddress,
    })
  }

  getMintAddress = (): string => {
    if (!this.isValidMint()) return ''
    return this._mint.toBase58()
  }
}
export default MultisigWallet
