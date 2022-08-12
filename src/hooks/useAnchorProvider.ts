import { AnchorProvider } from '@project-serum/anchor'
import { rpc, useWalletAddress } from '@sentre/senhub'
import { useEffect, useState } from 'react'
import { getAnchorProvider } from 'sentre-web3'

export const useAnchorProvider = () => {
  const [provider, setProvider] = useState({} as AnchorProvider)
  const walletAddress = useWalletAddress()

  useEffect(() => {
    const provider = getAnchorProvider(rpc, walletAddress, window.sentre.wallet)
    setProvider(provider)
  }, [walletAddress])

  return provider
}
