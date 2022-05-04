import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from 'app/model'
import { getCID } from 'app/helpers'
import { ProposalMetaData } from 'app/view/proposal/proposalInitialization'
import IPFS from 'shared/pdb/ipfs'

const useProposalMetaData = (proposalAddress: string) => {
  const [metaData, setMetaData] = useState<ProposalMetaData>()
  const { proposal } = useSelector((state: AppState) => state)
  const { metadata: digest } = proposal[proposalAddress] || {}

  const getMetaData = useCallback(async () => {
    if (!digest) return setMetaData(undefined)
    const cid = getCID(digest)
    const ipfs = new IPFS()
    try {
      const data = await ipfs.get(cid)
      return setMetaData(data)
    } catch (er: any) {
      return window.notify({ type: 'error', description: er.message })
    }
  }, [digest])

  useEffect(() => {
    getMetaData()
  }, [getMetaData])

  return metaData
}

export default useProposalMetaData
