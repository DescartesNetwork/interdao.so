import { Fragment, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { account } from '@senswap/sen-js'
import { useWallet } from '@senhub/providers'

import { getDaos } from 'app/model/dao.controller'
import { AppDispatch } from 'app/model'

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

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return <Fragment />
}

export default DaoWatcher
