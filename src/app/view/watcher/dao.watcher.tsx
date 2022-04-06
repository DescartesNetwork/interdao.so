import { Fragment, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { account } from '@senswap/sen-js'
import { useWallet } from '@senhub/providers'

import { getDao, getDaos } from 'app/model/dao.controller'
import { AppDispatch } from 'app/model'
import configs from 'app/configs'

// Watch id
let initializeDAOEventId = 0

const DaoWatcher = () => {
  const {
    wallet: { address: walletAddress },
  } = useWallet()
  const dispatch = useDispatch<AppDispatch>()

  // First-time fetching
  const fetchData = useCallback(async () => {
    try {
      if (!account.isAddress(walletAddress)) return
      await dispatch(getDaos()).unwrap()
    } catch (er) {
      return window.notify({
        type: 'error',
        description: 'Cannot fetch data of DAOs',
      })
    }
  }, [dispatch, walletAddress])
  // Watch dao events
  const watchData = useCallback(async () => {
    const {
      sol: { interDao },
    } = configs
    initializeDAOEventId = await interDao.addListener(
      'InitializeDAOEvent',
      ({ dao: daoPublicKey }) => {
        return dispatch(
          getDao({ address: daoPublicKey.toBase58(), force: true }),
        )
      },
    )
  }, [dispatch])

  useEffect(() => {
    fetchData()
    watchData()
    // Unwatch (cancel socket)
    return () => {
      ;(async () => {
        try {
          const {
            sol: { interDao },
          } = configs
          await interDao.removeListener(initializeDAOEventId)
        } catch (er) {}
      })()
      initializeDAOEventId = 0
    }
  }, [fetchData, watchData])

  return <Fragment />
}

export default DaoWatcher
