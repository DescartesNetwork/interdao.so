import { Spin } from 'antd'
import { PropsTemplateProposalLoader } from '../../templateLoader'

import useProposal from 'hooks/proposal/useProposal'
import useProposalMetaData from 'hooks/proposal/useProposalMetaData'
import ProposalCardDefault from 'templates/components/proposalCardDefault'
import { TEMPLATE_CONFIGS } from './configs'

import BACKGROUND from 'static/images/templates/bg-blank.png'

const Proposal = ({ proposalAddress }: PropsTemplateProposalLoader) => {
  const proposalData = useProposal(proposalAddress)
  const { metaData } = useProposalMetaData(proposalAddress)

  if (!proposalData || !metaData) return <Spin spinning />

  return (
    <ProposalCardDefault
      proposalAddress={proposalAddress}
      configs={TEMPLATE_CONFIGS}
      background={`url(${BACKGROUND})`}
    />
  )
}

export default Proposal
