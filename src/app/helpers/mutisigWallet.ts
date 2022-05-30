import { DEFAULT_EMPTY_ADDRESS, WalletInterface } from '@senswap/sen-js'
import {
  Spl,
  AnchorProvider,
  web3,
  setProvider,
  BN,
  utils,
} from '@project-serum/anchor'
import { PublicKey, Transaction, ComputeBudgetProgram } from '@solana/web3.js'
import { FeeOptions, FEE_OPTIONS, isAddress } from '@sentre/utility'

import configs from 'app/configs'

const {
  sol: { utility },
} = configs

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

  initializeAccountIx = async (
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
    return ix
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
    return mint.publicKey.toBase58()
  }

  isValidMint = (): boolean => {
    return this._mint.toBase58() !== DEFAULT_EMPTY_ADDRESS
  }

  mintToAccount = async (dstAddress: string, amount: number) => {
    if (!this.isValidMint()) throw new Error('Please create mint first!')
    await utility.safeMintTo({
      amount: new BN(amount),
      tokenAddress: this._mint.toBase58(),
      dstWalletAddress: dstAddress,
    })
  }
  mintToAccounts = async (pubkeys: PublicKey[]) => {
    if (!this.isValidMint()) throw new Error('Please create mint first!')

    const provider = await this.getProvider()
    const transaction = new Transaction()
    const additionalComputeBudgetInstruction =
      ComputeBudgetProgram.requestUnits({
        units: 400000,
        additionalFee: 0,
      })
    transaction.add(additionalComputeBudgetInstruction)

    for (const pubkey of pubkeys) {
      const tokenAccount = await utils.token.associatedAddress({
        mint: this._mint,
        owner: pubkey,
      })
      const ixCreate = await this.initializeAccountIx(
        tokenAccount,
        this._mint,
        pubkey,
        provider,
      )
      transaction.add(ixCreate)

      const ixMintTo = await this.wrapSafeMintTo({
        amount: new BN(1),
        tokenAddress: this._mint.toBase58(),
        dstWalletAddress: tokenAccount.toBase58(),
        feeOptions: FEE_OPTIONS(provider.wallet.publicKey.toBase58()),
      })

      transaction.add(ixMintTo)
    }

    return provider.sendAndConfirm(transaction)
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
