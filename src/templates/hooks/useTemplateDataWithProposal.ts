import { useCallback, useEffect, useState } from 'react'
import useProposalMetaData from 'hooks/proposal/useProposalMetaData'

export const useTemplateDataWithProposal = <T>(proposalAddress: string) => {
  const [templateData, setTemplateData] = useState<T>()
  const { metaData, loading } = useProposalMetaData(proposalAddress)

  const getTemplateName = useCallback(() => {
    if (!metaData || loading || !metaData.templateData)
      return setTemplateData(undefined)
    return setTemplateData(metaData.templateData)
  }, [loading, metaData])

  useEffect(() => {
    getTemplateName()
  }, [getTemplateName])

  return templateData
}
