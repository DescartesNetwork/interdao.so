import { useMemo } from 'react'
import { useWallet } from '@senhub/providers'

import configs from 'app/configs'
import PDB from 'shared/pdb'

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
