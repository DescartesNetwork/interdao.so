import { utils } from '@senswap/sen-js'

import { Col, Row, Space, Typography } from 'antd'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'
import { PropsTemplateProposalLoader } from '../templateLoader'
import RowSpaceBetween from 'app/components/rowSpaceBetween'
import IconCopy from 'app/components/iconCopy'

import { useTemplateDataWithProposal } from '../hooks/useTemplateDataWithProposal'
import useMintDecimals from 'shared/hooks/useMintDecimals'
import { SplApproveIds } from './configs'
import { explorer, shortenAddress } from 'shared/util'

const Proposal = ({ proposalAddress }: PropsTemplateProposalLoader) => {
  const templateData =
    useTemplateDataWithProposal<Record<SplApproveIds, string>>(proposalAddress)

  const mint = templateData.mint
  const decimals = useMintDecimals(mint) || 0
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
        <RowSpaceBetween
          label="Amount"
          value={
            !mint
              ? '--'
              : utils.undecimalize(BigInt(templateData.amount), decimals)
          }
        />
      </Col>
      <Col span={24}>
        <RowSpaceBetween
          label="Source's Wallet Address"
          value={
            <Space size={10}>
              <Typography.Text
                style={{ cursor: 'pointer', textDecoration: 'underline' }}
                onClick={() => window.open(explorer(source), '_blank')}
              >
                {shortenAddress(source)}
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
                onClick={() => window.open(explorer(delegate), '_blank')}
              >
                {shortenAddress(delegate)}
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
