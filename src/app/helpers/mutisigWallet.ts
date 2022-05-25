import { DEFAULT_EMPTY_ADDRESS, WalletInterface } from '@senswap/sen-js'
import {
  Spl,
  AnchorProvider,
  web3,
  setProvider,
  BN,
  utils,
} from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'

class MultisigWallet {
  private _mint: PublicKey

  constructor(mintAddress: string) {
    this._mint = new PublicKey(mintAddress)
  }

  getAnchorProvider = async (
    node: string,
    walletAddress: string,
    wallet: WalletInterface,
  ): Promise<AnchorProvider> => {
    const connection = new web3.Connection(node, 'confirmed')

    const signAllTransactions = async (transactions: web3.Transaction[]) => {
      const signedTransactions = []
      for (const transaction of transactions) {
        const signedTransaction = await wallet.signTransaction(transaction)
        signedTransactions.push(signedTransaction)
      }
      return signedTransactions
    }

    const publicKey = new web3.PublicKey(walletAddress)
    const anchorProvider = new AnchorProvider(
      connection,
      {
        publicKey: new web3.PublicKey(publicKey),
        signTransaction: wallet.signTransaction,
        signAllTransactions,
      },
      {
        commitment: 'confirmed',
        skipPreflight: true,
      },
    )
    setProvider(anchorProvider)
    return anchorProvider
  }

  initializeAccount = async (
    associatedTokenAccount: web3.PublicKey,
    token: web3.PublicKey,
    authority: web3.PublicKey,
    provider: AnchorProvider,
  ) => {
    const ix = new web3.TransactionInstruction({
      keys: [
        {
          pubkey: provider.wallet.publicKey,
          isSigner: true,
          isWritable: true,
        },
        {
          pubkey: associatedTokenAccount,
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: authority,
          isSigner: false,
          isWritable: false,
        },
        {
          pubkey: token,
          isSigner: false,
          isWritable: false,
        },
        {
          pubkey: web3.SystemProgram.programId,
          isSigner: false,
          isWritable: false,
        },
        {
          pubkey: utils.token.TOKEN_PROGRAM_ID,
          isSigner: false,
          isWritable: false,
        },
        {
          pubkey: web3.SYSVAR_RENT_PUBKEY,
          isSigner: false,
          isWritable: false,
        },
      ],
      programId: utils.token.ASSOCIATED_PROGRAM_ID,
      data: Buffer.from([]),
    })
    const tx = new web3.Transaction().add(ix)
    return await provider.sendAndConfirm(tx)
  }

  initializeMint = async (
    decimals: number,
    token: web3.Keypair,
    provider: AnchorProvider,
  ) => {
    const spl = Spl.token()
    const ix = await (spl.account as any).mint.createInstruction(token)
    const tx = new web3.Transaction().add(ix)
    await provider.sendAndConfirm(tx, [token])
    return await spl.rpc.initializeMint(
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
    )
  }

  getProvider = async () => {
    const { splt, wallet } = window.sentre
    const walletAddress = await wallet.getAddress()
    const provider = await this.getAnchorProvider(
      splt.nodeUrl,
      walletAddress,
      wallet,
    )
    return provider
  }

  createNewToken = async () => {
    const mint = new web3.Keypair()
    const provider = await this.getProvider()
    await this.initializeMint(0, mint, provider)
    this._mint = mint.publicKey
  }

  isValidMint = (): boolean => {
    return this._mint.toBase58() !== DEFAULT_EMPTY_ADDRESS
  }

  mintToAccount = async (pubkey: PublicKey) => {
    if (!this.isValidMint()) throw new Error('Please create mint first!')

    const provider = await this.getProvider()
    const spl = Spl.token()
    // Derive token account
    const tokenAccount = await utils.token.associatedAddress({
      mint: this._mint,
      owner: pubkey,
    })
    await this.initializeAccount(tokenAccount, this._mint, pubkey, provider)

    //mintTo
    await spl.rpc.mintTo(new BN(1), {
      accounts: {
        mint: this._mint,
        to: tokenAccount,
        authority: provider.wallet.publicKey,
      },
    })
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
