import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from 'app/model'
import { getCID } from 'app/helpers'
import { ProposalMetaData } from 'app/view/proposal/proposalInitialization'
import IPFS from 'app/helpers/ipfs'

const useProposalMetaData = (proposalAddress: string) => {
  const [metaData, setMetaData] = useState<ProposalMetaData>()
  const [loading, setLoading] = useState(false)
  const { proposal } = useSelector((state: AppState) => state)
  const { metadata: digest } = proposal[proposalAddress] || {}

  const getMetaData = useCallback(async () => {
    if (!digest) return setMetaData(undefined)
    setLoading(true)
    const cid = getCID(digest)
    const ipfs = new IPFS()
    try {
      const data = await ipfs.get<any>(cid)
      return setMetaData(data)
    } catch (er: any) {
      return window.notify({ type: 'error', description: er.message })
    } finally {
      setLoading(false)
    }
  }, [digest])

  useEffect(() => {
    getMetaData()
  }, [getMetaData])

  return { metaData, loading }
}

export default useProposalMetaData
