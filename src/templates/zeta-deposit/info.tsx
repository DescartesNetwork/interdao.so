import { Col, Row, Space } from 'antd'
import { MintAvatar, MintSymbol } from '@sen-use/app'
import { PropsTemplateProposalLoader } from '../templateLoader'
import RowSpaceBetween from 'components/rowSpaceBetween'

import { useTemplateDataWithProposal } from '../hooks/useTemplateDataWithProposal'
import { ZetaDepositIds } from './configs'

const Proposal = ({ proposalAddress }: PropsTemplateProposalLoader) => {
  const templateData =
    useTemplateDataWithProposal<Record<ZetaDepositIds, string>>(proposalAddress)

  const mint = templateData.zetaDepositMint

  return (
    <Row gutter={[12, 12]}>
      <Col span={24}>
        <RowSpaceBetween label="Template" value="Zeta/Deposit" />
      </Col>
      <Col span={24}>
        <RowSpaceBetween
          label="Token To Be Transferred"
          value={
            <Space>
              <MintAvatar mintAddress={mint} />
              <MintSymbol mintAddress={mint} />
            </Space>
          }
        />
      </Col>
      <Col span={24}>
        <RowSpaceBetween
          label="Deposit Amount"
          value={templateData?.amount || '--'}
        />
      </Col>
    </Row>
  )
}

export default Proposal
