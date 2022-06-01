import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { CID } from 'ipfs-core'
import BN from 'bn.js'

import IPFS from 'shared/pdb/ipfs'
import { explorer } from 'shared/util'
import useMintDecimals from 'shared/hooks/useMintDecimals'
import configs from 'app/configs'
import { AppState } from 'app/model'
import usePDB from '../usePDB'

const {
  sol: { interDao },
  manifest: { appId },
} = configs

const useFlexibleDao = () => {
  const [loading, setLoading] = useState(false)
  const initDao = useSelector((state: AppState) => state.dao.initDao)
  const initMetadata = useSelector(
    (state: AppState) => state.metadata.initMetadata,
  )
  const { mintAddress } = initDao
  const decimals = useMintDecimals(mintAddress) || 0
  const pdb = usePDB()
  const history = useHistory()

  const createFlexDAO = useCallback(async () => {
    try {
      setLoading(true)
      const { mintAddress, supply, regime, isPublic, isNft } = initDao
      const ipfs = new IPFS()
      const cid = await ipfs.set(initMetadata)
      const {
        multihash: { digest },
      } = CID.parse(cid)
      const metadata = Buffer.from(digest)
      const totalSupply = supply.mul(new BN(10).pow(new BN(decimals)))

      const { txId, daoAddress } = await interDao.initializeDao(
        mintAddress,
        totalSupply,
        metadata,
        undefined, // Optional DAO's keypair
        regime,
        isNft,
        isPublic,
      )
      const localMetadata = { ...initMetadata, cid }
      await pdb.setItem(daoAddress, localMetadata) // to realtime
      window.notify({
        type: 'success',
        description: 'A new DAO is created. Click here to view details.',
        onClick: () => window.open(explorer(txId), '_blank'),
      })
      return history.push(`/app/${appId}/dao/${daoAddress}`)
    } catch (er: any) {
      window.notify({ type: 'error', description: er.message })
    } finally {
      setLoading(false)
    }
  }, [initDao, initMetadata, decimals, pdb, history])

  return { createFlexDAO, loading }
}

export default useFlexibleDao
