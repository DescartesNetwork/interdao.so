import { Connection } from '@solana/web3.js'
import { useEffect, useState } from 'react'
import { AnchorProvider } from '@project-serum/anchor'
import { useWalletAddress } from '@sentre/senhub'
import { getAnchorProvider } from '@sentre/senhub'

export const useAnchorProvider = () => {
  const [provider, setProvider] = useState({} as AnchorProvider)

  const walletAddress = useWalletAddress()

  useEffect(() => {
    const provider = getAnchorProvider()!
    const devNetProvider = new AnchorProvider(
      new Connection('https://devnet.genesysgo.net'),
      provider.wallet as any,
      {},
    )
    setProvider(devNetProvider)
  }, [walletAddress])

  return provider
}
