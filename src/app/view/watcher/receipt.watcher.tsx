import { Fragment, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { PublicKey } from '@solana/web3.js'
import { useWallet } from '@senhub/providers'
import { account } from '@senswap/sen-js'

import { AppDispatch } from 'app/model'
import configs from 'app/configs'
import { getReceipt, getReceipts } from 'app/model/receipt.controller'

const {
  sol: { interDao },
} = configs

// Watch id
let voteForEventId = 0
let voteAgainstEventId = 0
let closeEventId = 0

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
      if (!account.isAddress(walletAddress)) return
      await dispatch(getReceipts({ authorityAddress: walletAddress })).unwrap()
    } catch (er) {
      return window.notify({
        type: 'error',
        description: 'Cannot fetch data of receipts',
      })
    }
  }, [dispatch, walletAddress])
  // Watch dao events
  const watchData = useCallback(async () => {
    voteForEventId = await interDao.addListener(
      'VoteForEvent',
      reloadReceiptData,
    )
    voteAgainstEventId = await interDao.addListener(
      'VoteAgainstEvent',
      reloadReceiptData,
    )
    closeEventId = await interDao.addListener('CloseEvent', reloadReceiptData)
  }, [reloadReceiptData])

  useEffect(() => {
    fetchData()
    // I don't understand why but this fixes the watcher error
    setTimeout(async () => {
      watchData()
    }, 1500)
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
