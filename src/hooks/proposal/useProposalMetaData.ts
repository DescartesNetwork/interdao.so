import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { AppDispatch } from 'model'
import { getCID } from 'helpers'
import { ProposalMetaData } from 'view/proposal/proposalInitialization'
import IPFS from 'helpers/ipfs'
import { getProposal } from 'model/proposal.controller'
import { DataLoader } from '@sentre/senhub'

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
      const cid = getCID(digest)
      const ipfs = new IPFS()
      const data = await ipfs.get<any>(cid)
      return setMetaData(data)
    } catch (er: any) {
      return window.notify({ type: 'error', description: er.message })
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
