import { Fragment, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { PublicKey } from '@solana/web3.js'
import { useWallet } from '@senhub/providers'
import { account } from '@senswap/sen-js'

import { AppDispatch } from 'app/model'
import { getReceipt, getReceipts } from 'app/model/receipt.controller'
import { addLoading, clearLoading } from 'app/model/loading.controller'
import { getProposal } from 'app/model/proposal.controller'
import { addEventListener } from './evens.watch'

const ReceiptWatcher = () => {
  const {
    wallet: { address: walletAddress },
  } = useWallet()
  const dispatch = useDispatch<AppDispatch>()

  const reloadReceiptData = useCallback(
    ({
      receipt: receiptPublicKey,
      proposal,
    }: {
      receipt: PublicKey
      proposal?: PublicKey
    }) => {
      console.log('reload')
      const receiptAddress = receiptPublicKey.toBase58()
      if (proposal) {
        const proposalAddress = proposal.toBase58()
        dispatch(getProposal({ address: proposalAddress, force: true }))
      }
      return dispatch(
        getReceipt({ address: receiptAddress, force: true }),
      ).unwrap()
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
    addEventListener(
      ['VoteForEvent', 'VoteAgainstEvent', 'CloseEvent'],
      reloadReceiptData,
    )
  }, [reloadReceiptData])

  useEffect(() => {
    fetchData()
    watchData()
  }, [fetchData, watchData])

  return <Fragment />
}

export default ReceiptWatcher
