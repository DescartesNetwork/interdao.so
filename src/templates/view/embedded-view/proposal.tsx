import { useMemo } from 'react'

import { PropsTemplateProposalLoader } from '../../templateLoader'
import ProposalCardDefault from 'templates/components/proposalCardDefault'

import useProposalMetaData from 'hooks/proposal/useProposalMetaData'
import { EmbeddedViewData, TEMPLATE_CONFIGS } from './configs'

import SOLEND_BACKGROUND from 'static/images/templates/logo-solend.png'

const Proposal = ({ proposalAddress }: PropsTemplateProposalLoader) => {
  const { metaData } = useProposalMetaData(proposalAddress)

  const background = useMemo(() => {
    const templateData: EmbeddedViewData = metaData?.templateData
    switch (templateData?.appId) {
      case 'solend':
        return `url(${SOLEND_BACKGROUND})`
      default:
        return null
    }
  }, [metaData])

  return (
    <ProposalCardDefault
      proposalAddress={proposalAddress}
      configs={TEMPLATE_CONFIGS}
      background={background || ''}
    />
  )
}

export default Proposal
