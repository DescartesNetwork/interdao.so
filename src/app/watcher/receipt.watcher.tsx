import { Fragment, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { PublicKey } from '@solana/web3.js'
import { useWallet } from '@senhub/providers'
import { account } from '@senswap/sen-js'

import { AppDispatch } from 'app/model'
import configs from 'app/configs'
import { getReceipt, getReceipts } from 'app/model/receipt.controller'
import { addLoading, clearLoading } from 'app/model/loading.controller'

const {
  sol: { interDao },
} = configs

// Watch id
let voteForEventId = 0
let voteAgainstEventId = 0
let closeEventId = 0

let watchVoteFor: NodeJS.Timer
let watchVoteAgainst: NodeJS.Timer
let watchClose: NodeJS.Timer

const TIME_RECHECK = 500

const ReceiptWatcher = () => {
  const {
    wallet: { address: walletAddress },
  } = useWallet()
  const dispatch = useDispatch<AppDispatch>()

  const reloadReceiptData = useCallback(
    ({ receipt: receiptPublicKey }: { receipt: PublicKey }) => {
      const receiptAddress = receiptPublicKey.toBase58()
      return dispatch(getReceipt({ address: receiptAddress, force: true }))
    },
    [dispatch],
  )

  // First-time fetching
  const fetchData = useCallback(async () => {
    try {
      dispatch(
        addLoading({
          id: 'fetch-receipt',
          message: 'Welcome to InterDAO. Loading Receipts...',
        }),
      )
      if (!account.isAddress(walletAddress)) return
      await dispatch(getReceipts({ authorityAddress: walletAddress })).unwrap()
    } catch (er) {
      return window.notify({
        type: 'error',
        description: 'Cannot fetch data of receipts',
      })
    } finally {
      dispatch(clearLoading('fetch-receipt'))
    }
  }, [dispatch, walletAddress])
  // Watch dao events
  const watchData = useCallback(async () => {
    watchVoteFor = setInterval(async () => {
      if (voteForEventId) return clearInterval(watchVoteFor)
      voteForEventId = await interDao.addListener(
        'VoteForEvent',
        reloadReceiptData,
      )
    }, TIME_RECHECK)

    watchVoteAgainst = setInterval(async () => {
      if (voteAgainstEventId) return clearInterval(watchVoteAgainst)
      voteAgainstEventId = await interDao.addListener(
        'VoteAgainstEvent',
        reloadReceiptData,
      )
    }, TIME_RECHECK)

    watchClose = setInterval(async () => {
      if (closeEventId) return clearInterval(watchClose)
      closeEventId = await interDao.addListener('CloseEvent', reloadReceiptData)
    }, TIME_RECHECK)
  }, [reloadReceiptData])

  useEffect(() => {
    fetchData()
    watchData()
    // Unwatch (cancel socket)
    return () => {
      ;(async () => {
        try {
          await interDao.removeListener(voteForEventId)
          await interDao.removeListener(voteAgainstEventId)
          await interDao.removeListener(closeEventId)
        } catch (er: any) {
          console.warn(er.message)
        } finally {
          voteForEventId = 0
          voteAgainstEventId = 0
          closeEventId = 0
        }
      })()
    }
  }, [fetchData, watchData])

  return <Fragment />
}

export default ReceiptWatcher
