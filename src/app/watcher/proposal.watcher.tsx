import { Fragment, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { PublicKey } from '@solana/web3.js'

import { AppDispatch } from 'app/model'
import configs from 'app/configs'
import { getProposal, getProposals } from 'app/model/proposal.controller'
import { addLoading, clearLoading } from 'app/model/loading.controller'

const {
  sol: { interDao },
} = configs

// Watch id
let initializeProposalEventId = 0
let voteForEventId = 0
let voteAgainstEventId = 0
let executeProposalEventId = 0

let watchInitializeProposal: NodeJS.Timer
let watchVoteFor: NodeJS.Timer
let watchVoteAgainst: NodeJS.Timer
let watchExecuteProposal: NodeJS.Timer

const TIME_RECHECK = 500

const ProposalWatcher = () => {
  const dispatch = useDispatch<AppDispatch>()

  const reloadProposalData = useCallback(
    ({ proposal: proposalPublicKey }: { proposal: PublicKey }) => {
      dispatch(
        addLoading({
          id: 'fetch-proposal',
          message: 'Welcome to InterDAO. Loading Proposals...',
        }),
      )
      try {
        const proposalAddress = proposalPublicKey.toBase58()
        return dispatch(getProposal({ address: proposalAddress, force: true }))
      } catch (error) {
      } finally {
        dispatch(clearLoading('fetch-proposal'))
      }
    },
    [dispatch],
  )

  // Watch dao events
  const watchData = useCallback(async () => {
    watchInitializeProposal = setInterval(async () => {
      if (initializeProposalEventId)
        return clearInterval(watchInitializeProposal)
      initializeProposalEventId = await interDao.addListener(
        'InitializeProposalEvent',
        reloadProposalData,
      )
    }, TIME_RECHECK)

    watchVoteFor = setInterval(async () => {
      if (voteForEventId) return clearInterval(watchVoteFor)
      voteForEventId = await interDao.addListener(
        'VoteForEvent',
        reloadProposalData,
      )
    }, TIME_RECHECK)

    watchVoteAgainst = setInterval(async () => {
      if (voteAgainstEventId) return clearInterval(watchVoteAgainst)
      voteAgainstEventId = await interDao.addListener(
        'VoteAgainstEvent',
        reloadProposalData,
      )
    }, TIME_RECHECK)

    watchExecuteProposal = setInterval(async () => {
      if (executeProposalEventId) return clearInterval(watchExecuteProposal)
      executeProposalEventId = await interDao.addListener(
        'ExecuteProposalEvent',
        reloadProposalData,
      )
    }, TIME_RECHECK)
  }, [reloadProposalData])

  useEffect(() => {
    // I don't understand why but this fixes the watcher error
    watchData()
    dispatch(getProposals()) //fetch all proposal
    // Unwatch (cancel socket)
    return () => {
      ;(async () => {
        try {
          await interDao.removeListener(initializeProposalEventId)
          await interDao.removeListener(voteForEventId)
          await interDao.removeListener(voteAgainstEventId)
          await interDao.removeListener(executeProposalEventId)
        } catch (er: any) {
          console.warn(er.message)
        } finally {
          initializeProposalEventId = 0
          voteForEventId = 0
          voteAgainstEventId = 0
          executeProposalEventId = 0
        }
      })()
    }
  }, [dispatch, watchData])

  return <Fragment />
}

export default ProposalWatcher
