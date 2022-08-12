import { useMemo } from 'react'
import { PDB, useWalletAddress } from '@sentre/senhub'

import configs from 'configs'

const {
  manifest: { appId },
} = configs

const usePDB = () => {
  const walletAddress = useWalletAddress()

  const pdb = useMemo(() => {
    return new PDB(walletAddress).createInstance(appId)
  }, [walletAddress])

  return pdb
}

export default usePDB
