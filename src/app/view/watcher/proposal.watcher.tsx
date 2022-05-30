import { Fragment, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { PublicKey } from '@solana/web3.js'

import { AppDispatch } from 'app/model'
import configs from 'app/configs'
import { getProposal, getProposals } from 'app/model/proposal.controller'

const {
  sol: { interDao },
} = configs

// Watch id
let initializeProposalEventId = 0
let voteForEventId = 0
let voteAgainstEventId = 0
let executeProposalEventId = 0

const ProposalWatcher = () => {
  const dispatch = useDispatch<AppDispatch>()

  const reloadProposalData = useCallback(
    ({ proposal: proposalPublicKey }: { proposal: PublicKey }) => {
      const proposalAddress = proposalPublicKey.toBase58()
      return dispatch(getProposal({ address: proposalAddress, force: true }))
    },
    [dispatch],
  )

  // Watch dao events
  const watchData = useCallback(async () => {
    initializeProposalEventId = await interDao.addListener(
      'InitializeProposalEvent',
      reloadProposalData,
    )
    voteForEventId = await interDao.addListener(
      'VoteForEvent',
      reloadProposalData,
    )
    voteAgainstEventId = await interDao.addListener(
      'VoteAgainstEvent',
      reloadProposalData,
    )
    executeProposalEventId = await interDao.addListener(
      'ExecuteProposalEvent',
      reloadProposalData,
    )
  }, [reloadProposalData])

  useEffect(() => {
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
