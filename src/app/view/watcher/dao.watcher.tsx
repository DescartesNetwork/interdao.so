import { Fragment, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { account } from '@senswap/sen-js'
import { useWallet } from '@senhub/providers'
import { PublicKey } from '@solana/web3.js'

import { AppDispatch } from 'app/model'
import configs from 'app/configs'
import { getDao, getDaos } from 'app/model/dao.controller'

const {
  sol: { interDao },
} = configs

// Watch id
let initializeDAOEventId = 0
let updateDaoRegimeEventId = 0
let updateSupplyEventId = 0
let transferAuthorityEventId = 0

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
    initializeDAOEventId = await interDao.addListener(
      'InitializeDAOEvent',
      reloadDaoData,
    )
    updateDaoRegimeEventId = await interDao.addListener(
      'UpdateDaoRegimeEvent',
      reloadDaoData,
    )
    updateSupplyEventId = await interDao.addListener(
      'UpdateSupplyEvent',
      reloadDaoData,
    )
    transferAuthorityEventId = await interDao.addListener(
      'TransferAuthorityEvent',
      reloadDaoData,
    )
  }, [reloadDaoData])

  useEffect(() => {
    fetchData()
    watchData()
    // Unwatch (cancel socket)
    return () => {
      ;(async () => {
        try {
          await interDao.removeListener(initializeDAOEventId)
          await interDao.removeListener(updateDaoRegimeEventId)
          await interDao.removeListener(updateSupplyEventId)
          await interDao.removeListener(transferAuthorityEventId)
        } catch (er: any) {
          console.warn(er.message)
        } finally {
          initializeDAOEventId = 0
          updateDaoRegimeEventId = 0
          updateSupplyEventId = 0
          transferAuthorityEventId = 0
        }
      })()
    }
  }, [fetchData, watchData])

  return <Fragment />
}

export default DaoWatcher
