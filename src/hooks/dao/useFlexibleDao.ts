import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { CID } from 'ipfs-core'
import BN from 'bn.js'
import { util } from '@sentre/senhub'

import IPFS from 'helpers/ipfs'
import useMintDecimals from 'shared/hooks/useMintDecimals'
import configs from 'configs'
import { AppState } from 'model'
import usePDB from '../usePDB'
import { deriveDaoNameURL } from './useDaoNameUrl'

const {
  sol: { interDao },
  manifest: { appId },
} = configs

const useFlexibleDao = () => {
  const [loading, setLoading] = useState(false)
  const createDaoData = useSelector((state: AppState) => state.createDao.data)

  const { mintAddress, metadata } = createDaoData
  const decimals = useMintDecimals(mintAddress) || 0
  const pdb = usePDB()
  const history = useHistory()
  const daoNameUrl = deriveDaoNameURL(metadata.daoName)

  const createFlexDAO = useCallback(async () => {
    try {
      setLoading(true)
      const { mintAddress, supply, regime, isPublic, isNft, metadata } =
        createDaoData
      const ipfs = new IPFS()
      const cid = await ipfs.set(metadata)
      const {
        multihash: { digest },
      } = CID.parse(cid)
      const metadataBuff = Buffer.from(digest)
      const totalSupply = supply.mul(new BN(10).pow(new BN(decimals)))

      const { txId, daoAddress } = await interDao.initializeDao(
        mintAddress,
        totalSupply,
        metadataBuff,
        undefined, // Optional DAO's keypair
        regime,
        isNft,
        isPublic,
      )
      const localMetadata = { ...metadata, cid }
      await pdb.setItem(daoAddress, localMetadata) // to realtime
      window.notify({
        type: 'success',
        description: 'A new DAO is created. Click here to view details.',
        onClick: () => window.open(util.explorer(txId), '_blank'),
      })
      return history.push(`/app/${appId}/dao/${daoAddress}/${daoNameUrl}`)
    } catch (er: any) {
      window.notify({ type: 'error', description: er.message })
    } finally {
      setLoading(false)
    }
  }, [createDaoData, decimals, pdb, history, daoNameUrl])

  return { createFlexDAO, loading }
}

export default useFlexibleDao
