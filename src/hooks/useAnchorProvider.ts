import { AnchorProvider } from '@project-serum/anchor'
import { rpc, useWallet } from '@sentre/senhub'
import { useEffect, useState } from 'react'
import { getAnchorProvider } from 'sentre-web3'

export const useAnchorProvider = () => {
  const [provider, setProvider] = useState({} as AnchorProvider)
  const { wallet } = useWallet()

  useEffect(() => {
    const provider = getAnchorProvider(
      rpc,
      wallet.address,
      window.sentre.wallet,
    )
    setProvider(provider)
  }, [wallet.address])

  return provider
}
