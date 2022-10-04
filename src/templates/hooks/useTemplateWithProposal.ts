import { useCallback, useEffect, useState } from 'react'

import useProposalMetaData from 'hooks/proposal/useProposalMetaData'
import { TemplateNames } from '../constant/index'

export const useTemplateWithProposal = (proposalAddress: string) => {
  const [templateName, setTemplateName] = useState<TemplateNames>()
  const { metaData, loading } = useProposalMetaData(proposalAddress)

  const getTemplateName = useCallback(() => {
    const templateName = metaData?.templateConfig?.name
    if (!templateName || loading) return setTemplateName(undefined)
    return setTemplateName(templateName)
  }, [loading, metaData])
  useEffect(() => {
    getTemplateName()
  }, [getTemplateName])

  return templateName
}
