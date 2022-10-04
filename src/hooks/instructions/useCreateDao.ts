import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useGetMintDecimals } from '@sentre/senhub'
import { BN } from '@project-serum/anchor'

import { ipfs } from 'helpers/ipfs'
import { notifySuccess, notifyError } from 'helpers'
import { AppState } from 'model'
import { APP_ROUTE } from 'configs/route'

const useCreateDao = () => {
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
      return history.push(APP_ROUTE.daoDetails.generatePath({ daoAddress }))
    } catch (er: any) {
      notifyError(er)
    } finally {
      setLoading(false)
    }
  }, [createDaoData, getMintDecimals, history])

  return { createFlexDAO, loading }
}

export default useCreateDao
