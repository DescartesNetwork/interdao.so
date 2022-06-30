import { useMemo } from 'react'
import { PDB, useWallet } from '@sentre/senhub'

import configs from 'configs'

const {
  manifest: { appId },
} = configs

const usePDB = () => {
  const {
    wallet: { address: walletAddress },
  } = useWallet()

  const pdb = useMemo(() => {
    return new PDB(walletAddress).createInstance(appId)
  }, [walletAddress])

  return pdb
}

export default usePDB
