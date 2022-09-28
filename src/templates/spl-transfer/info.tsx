import { util } from '@sentre/senhub'

import { Col, Row, Space, Typography } from 'antd'
import { MintAvatar, MintSymbol } from '@sen-use/app'
import { PropsTemplateProposalLoader } from '../templateLoader'
import RowSpaceBetween from 'components/rowSpaceBetween'
import IconCopy from 'components/iconCopy'

import { useTemplateDataWithProposal } from '../hooks/useTemplateDataWithProposal'
import { SplTransferIds } from './configs'

const Proposal = ({ proposalAddress }: PropsTemplateProposalLoader) => {
  const templateData =
    useTemplateDataWithProposal<Record<SplTransferIds, string>>(proposalAddress)

  const mint = templateData.mint
  const source = templateData?.source || ''
  const destination = templateData?.destination || ''

  return (
    <Row gutter={[12, 12]}>
      <Col span={24}>
        <RowSpaceBetween label="Template" value="SPL/Transfer" />
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
          label="Transfer Amount"
          value={templateData?.amount || '--'}
        />
      </Col>
      <Col span={24}>
        <RowSpaceBetween
          label="Sender's Wallet Address"
          value={
            <Space size={10}>
              <Typography.Text
                style={{ cursor: 'pointer', textDecoration: 'underline' }}
                onClick={() => window.open(util.explorer(source), '_blank')}
              >
                {util.shortenAddress(source)}
              </Typography.Text>
              <IconCopy value={source} />
            </Space>
          }
        />
      </Col>
      <Col span={24}>
        <RowSpaceBetween
          label="Receiver's Wallet Address"
          value={
            <Space size={10}>
              <Typography.Text
                style={{ cursor: 'pointer', textDecoration: 'underline' }}
                onClick={() =>
                  window.open(util.explorer(destination), '_blank')
                }
              >
                {util.shortenAddress(destination)}
              </Typography.Text>
              <IconCopy value={destination} />
            </Space>
          }
        />
      </Col>
    </Row>
  )
}

export default Proposal
