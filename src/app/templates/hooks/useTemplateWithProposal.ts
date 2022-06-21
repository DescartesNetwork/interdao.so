import useProposalMetaData from 'app/hooks/proposal/useProposalMetaData'
import { useCallback, useEffect, useState } from 'react'
import { TemplateNames } from '../index'

export const useTemplateWithProposal = (proposalAddress: string) => {
  const [templateName, setTemplateName] = useState<TemplateNames>()
  const { metaData, loading } = useProposalMetaData(proposalAddress)

  const getTemplateName = useCallback(() => {
    if (!metaData || loading) return setTemplateName(undefined)
    switch (metaData.templateName) {
      case 'spl_transfer':
        return setTemplateName(TemplateNames.SplTransfer)
      default:
        break
    }
  }, [loading, metaData])
  useEffect(() => {
    getTemplateName()
  }, [getTemplateName])

  return templateName
}
