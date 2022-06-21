import { useCallback, useEffect, useState } from 'react'

import useProposalMetaData from 'app/hooks/proposal/useProposalMetaData'
import { TemplateNames } from '../index'

export const useTemplateWithProposal = (proposalAddress: string) => {
  const [templateName, setTemplateName] = useState<TemplateNames>()
  const { metaData, loading } = useProposalMetaData(proposalAddress)

  const getTemplateName = useCallback(() => {
    if (!metaData || loading) return setTemplateName(undefined)
    // @ts-ignore
    return setTemplateName(metaData.templateName)
  }, [loading, metaData])
  useEffect(() => {
    getTemplateName()
  }, [getTemplateName])

  return templateName
}
