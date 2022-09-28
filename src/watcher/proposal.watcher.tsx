import { Fragment, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { PublicKey } from '@solana/web3.js'

import { AppDispatch } from 'model'
import { getProposal, getProposals } from 'model/proposal.controller'
import { addLoading, clearLoading } from 'model/loading.controller'
import { addEventListener } from './evens.watch'

const ProposalWatcher = () => {
  const dispatch = useDispatch<AppDispatch>()

  const reloadProposalData = useCallback(
    ({ proposal: proposalPublicKey }: { proposal: PublicKey }) => {
      const proposalAddress = proposalPublicKey.toBase58()
      return dispatch(getProposal({ address: proposalAddress, force: true }))
    },
    [dispatch],
  )

  // First-time fetching
  const fetchData = useCallback(async () => {
    try {
      dispatch(
        addLoading({
          id: 'fetch-proposals',
          message: 'Welcome to interDao. Loading proposal...',
        }),
      )
      dispatch(getProposals()) //fetch all proposal
    } catch (er) {
      return window.notify({
        type: 'error',
        description: 'Cannot fetch data of DAOs',
      })
    } finally {
      setTimeout(() => {
        dispatch(clearLoading('fetch-proposals'))
      }, 2000)
    }
  }, [dispatch])

  // Watch dao events
  const watchData = useCallback(async () => {
    addEventListener(
      [
        'InitializeProposalEvent',
        'VoteForEvent',
        'VoteAgainstEvent',
        'ExecuteProposalInstructionEvent',
      ],
      reloadProposalData,
    )
  }, [reloadProposalData])

  useEffect(() => {
    // I don't understand why but this fixes the watcher error
    fetchData()
    watchData()
  }, [dispatch, fetchData, watchData])

  return <Fragment />
}

export default ProposalWatcher
