import { util } from '@sentre/senhub'

import { Col, Row, Space, Typography } from 'antd'
import { MintAvatar, MintSymbol } from '@sen-use/app'
import { PropsTemplateProposalLoader } from '../templateLoader'
import RowSpaceBetween from 'components/rowSpaceBetween'
import IconCopy from 'components/iconCopy'

import { useTemplateDataWithProposal } from '../hooks/useTemplateDataWithProposal'
import { SplApproveIds } from './configs'

const Proposal = ({ proposalAddress }: PropsTemplateProposalLoader) => {
  const templateData =
    useTemplateDataWithProposal<Record<SplApproveIds, string>>(proposalAddress)

  const mint = templateData.mint
  const source = templateData?.source || ''
  const delegate = templateData?.delegate || ''

  return (
    <Row gutter={[12, 12]}>
      <Col span={24}>
        <RowSpaceBetween label="Template" value="SPL/Approve" />
      </Col>
      <Col span={24}>
        <RowSpaceBetween
          label="Token"
          value={
            <Space>
              <MintAvatar mintAddress={mint} />
              <MintSymbol mintAddress={mint} />
            </Space>
          }
        />
      </Col>
      <Col span={24}>
        <RowSpaceBetween label="Amount" value={templateData?.amount || '--'} />
      </Col>
      <Col span={24}>
        <RowSpaceBetween
          label="Source's Wallet Address"
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
          label="Delegate's Wallet Address"
          value={
            <Space size={10}>
              <Typography.Text
                style={{ cursor: 'pointer', textDecoration: 'underline' }}
                onClick={() => window.open(util.explorer(delegate), '_blank')}
              >
                {util.shortenAddress(delegate)}
              </Typography.Text>
              <IconCopy value={delegate} />
            </Space>
          }
        />
      </Col>
    </Row>
  )
}

export default Proposal
