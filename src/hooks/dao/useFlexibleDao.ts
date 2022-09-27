import { useGetMintDecimals } from '@sentre/senhub'
import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { BN } from '@project-serum/anchor'

import { ipfs } from 'helpers/ipfs'
import { notifySuccess } from 'helpers'
import { AppState } from 'model'
import { deriveDaoNameURL } from './useDaoNameUrl'
import configs from 'configs'

const {
  manifest: { appId },
} = configs

const useFlexibleDao = () => {
  const [loading, setLoading] = useState(false)
  const createDaoData = useSelector((state: AppState) => state.createDao.data)
  const getMintDecimals = useGetMintDecimals()
  const history = useHistory()

  const createFlexDAO = useCallback(async () => {
    try {
      setLoading(true)
      const { mintAddress, supply, regime, isPublic, isNft, metadata } =
        createDaoData
      const { digest } = await ipfs.methods.daoMetadata.set(metadata)
      const decimals = await getMintDecimals({ mintAddress })
      const metadataBuff = Buffer.from(digest)
      const totalSupply = supply.mul(new BN(10).pow(new BN(decimals!)))

      const { txId, daoAddress } = await window.interDao.initializeDao(
        mintAddress,
        totalSupply,
        metadataBuff,
        undefined, // Optional DAO's keypair
        regime,
        isNft,
        isPublic,
      )
      notifySuccess('Create DAO', txId)
      const daoNameUrl = deriveDaoNameURL(metadata.daoName)
      return history.push(`/app/${appId}/dao/${daoAddress}/${daoNameUrl}`)
    } catch (er: any) {
      console.log('er', er)
      window.notify({ type: 'error', description: er.message })
    } finally {
      setLoading(false)
    }
  }, [createDaoData, getMintDecimals, history])

  return { createFlexDAO, loading }
}

export default useFlexibleDao
