import { useEffect, useState } from 'react'
import { AnchorProvider } from '@project-serum/anchor'
import { useWalletAddress } from '@sentre/senhub'
import { getAnchorProvider } from '@sentre/senhub'

export const useAnchorProvider = () => {
  const [provider, setProvider] = useState({} as AnchorProvider)
  const walletAddress = useWalletAddress()

  useEffect(() => {
    const provider = getAnchorProvider()!
    setProvider(provider)
  }, [walletAddress])

  return provider
}
