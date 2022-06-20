import { Fragment, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { account } from '@senswap/sen-js'
import { useWallet } from '@senhub/providers'
import { PublicKey } from '@solana/web3.js'

import { AppDispatch } from 'app/model'
import configs from 'app/configs'
import { getDao, getDaos } from 'app/model/daos.controller'
import { addLoading, clearLoading } from 'app/model/loading.controller'

const {
  sol: { interDao },
} = configs

// Watch id
const EVENTS = [
  'InitializeDAOEvent',
  'UpdateDaoRegimeEvent',
  'UpdateSupplyEvent',
  'TransferAuthorityEvent',
  'UpdateDaoMetadataEvent',
]
const TIME_RECHECK = 2000

type WatchState = {
  id: number
  interval: NodeJS.Timer
}
const watcherState: Record<string, WatchState> = {}

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
      dispatch(clearLoading('fetch-daos'))
    }
  }, [dispatch, walletAddress])
  // Watch dao events
  const watchData = useCallback(async () => {
    for (const event of EVENTS) {
      const state = watcherState[event] || {}
      if (state.interval || state.id) continue
      state.interval = setInterval(async () => {
        if (state.id) return clearInterval(state.interval)
        state.id = await interDao.addListener(event as any, reloadDaoData)
      }, TIME_RECHECK)
    }
  }, [reloadDaoData])

  useEffect(() => {
    fetchData()
    watchData()
    // Unwatch (cancel socket)
    return () => {
      ;(async () => {
        for (const event of EVENTS) {
          const state = watcherState[event]
          try {
            await interDao.removeListener(state.id)
          } catch (er: any) {
            console.warn(er.message)
          } finally {
            state.id = 0
          }
        }
      })()
    }
  }, [fetchData, watchData])

  return <Fragment />
}

export default DaoWatcher
