import { Fragment, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { account } from '@senswap/sen-js'
import { useWallet } from '@senhub/providers'

import { getDao, getDaos } from 'app/model/dao.controller'
import { AppDispatch } from 'app/model'
import configs from 'app/configs'

// Watch id
let initializeDAOEventId = 0
let updateDaoMechanismEventId = 0
let updateSupplyEventId = 0

const DaoWatcher = () => {
  const {
    wallet: { address: walletAddress },
  } = useWallet()
  const dispatch = useDispatch<AppDispatch>()

  const reloadDaoData = useCallback(
    (daoAddress: string) => {
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
    const {
      sol: { interDao },
    } = configs
    initializeDAOEventId = await interDao.addListener(
      'InitializeDAOEvent',
      ({ dao: daoPublicKey }) => reloadDaoData(daoPublicKey.toBase58()),
    )
    updateDaoMechanismEventId = await interDao.addListener(
      'UpdateDaoMechanismEvent',
      ({ dao: daoPublicKey }) => reloadDaoData(daoPublicKey.toBase58()),
    )
    updateSupplyEventId = await interDao.addListener(
      'UpdateSupplyEvent',
      ({ dao: daoPublicKey }) => reloadDaoData(daoPublicKey.toBase58()),
    )
  }, [reloadDaoData])

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
          await interDao.removeListener(updateDaoMechanismEventId)
          await interDao.removeListener(updateSupplyEventId)
        } catch (er) {}
      })()
      initializeDAOEventId = 0
      updateDaoMechanismEventId = 0
      updateSupplyEventId = 0
    }
  }, [fetchData, watchData])

  return <Fragment />
}

export default DaoWatcher
