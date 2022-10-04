import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { DataLoader } from '@sentre/senhub'

import { AppDispatch } from 'model'
import { ProposalMetaData } from 'view/createProposal'
import { getProposal } from 'model/proposals.controller'
import { ipfs } from 'helpers/ipfs'
import { notifyError } from 'helpers'

const useProposalMetaData = (proposalAddress: string) => {
  const dispatch = useDispatch<AppDispatch>()
  const [metaData, setMetaData] = useState<ProposalMetaData>()
  const [loading, setLoading] = useState(true)

  const getMetaData = useCallback(async () => {
    try {
      setLoading(true)
      const {
        [proposalAddress]: { metadata: digest },
      } = await DataLoader.load(`getProposal:${proposalAddress}`, () =>
        dispatch(getProposal({ address: proposalAddress })).unwrap(),
      )
      if (!digest) return setMetaData(undefined)
      const data = await ipfs.methods.proposalMetaData.get(digest)
      return setMetaData(data)
    } catch (er: any) {
      return notifyError(er)
    } finally {
      setLoading(false)
    }
  }, [dispatch, proposalAddress])

  useEffect(() => {
    getMetaData()
  }, [getMetaData])

  return { metaData, loading }
}

export default useProposalMetaData
