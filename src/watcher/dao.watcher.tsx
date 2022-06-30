import { Fragment, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { account } from '@senswap/sen-js'
import { useWallet } from '@sentre/senhub'
import { PublicKey } from '@solana/web3.js'

import { AppDispatch } from 'model'
import { getDao, getDaos } from 'model/daos.controller'
import { addLoading, clearLoading } from 'model/loading.controller'
import { addEventListener } from './evens.watch'

const DaoWatcher = () => {
  const {
    wallet: { address: walletAddress },
  } = useWallet()
  const dispatch = useDispatch<AppDispatch>()

  const reloadDaoData = useCallback(
    ({ dao: daoPublicKey }: { dao: PublicKey }) => {
      const daoAddress = daoPublicKey.toBase58()
      return dispatch(getDao({ address: daoAddress, force: true }))
    },
    [dispatch],
  )

  // First-time fetching
  const fetchData = useCallback(async () => {
    dispatch(
      addLoading({
        id: 'fetch-daos',
        message: 'Welcome to InterDAO. The application is loading...',
      }),
    )
    try {
      if (!account.isAddress(walletAddress)) return
      await dispatch(getDaos()).unwrap()
    } catch (er) {
      return window.notify({
        type: 'error',
        description: 'Cannot fetch data of DAOs',
      })
    } finally {
      setTimeout(() => {
        dispatch(clearLoading('fetch-daos'))
      }, 2000)
    }
  }, [dispatch, walletAddress])

  // Watch dao events
  const watchData = useCallback(async () => {
    addEventListener(
      [
        'InitializeDAOEvent',
        'UpdateDaoRegimeEvent',
        'UpdateSupplyEvent',
        'TransferAuthorityEvent',
        'UpdateDaoMetadataEvent',
      ],
      reloadDaoData,
    )
  }, [reloadDaoData])

  useEffect(() => {
    fetchData()
    watchData()
  }, [fetchData, watchData])

  return <Fragment />
}

export default DaoWatcher
