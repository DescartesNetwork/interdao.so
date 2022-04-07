import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { DaoData } from '@interdao/core'

import { Button, Card, Col, Row, Space, Typography } from 'antd'

import { AppState } from 'app/model'
import useMintDecimals from 'shared/hooks/useMintDecimals'
import { shortenAddress } from 'shared/util'

export type DaoCardProps = { daoAddress: string }

const DaoCard = ({ daoAddress }: DaoCardProps) => {
  const { dao } = useSelector((state: AppState) => state)
  const history = useHistory()

  const { mechanism, supply, mint, nonce } = dao[daoAddress] || ({} as DaoData)
  const decimals = useMintDecimals(mint.toBase58()) || 0
  const circulatingSupply = supply.toNumber() / 10 ** decimals

  return (
    <Card>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Space>
            <Typography.Text type="secondary">DAO:</Typography.Text>
            <Typography.Text>{shortenAddress(daoAddress)}</Typography.Text>
          </Space>
        </Col>
        <Col span={12}>
          <Space>
            <Typography.Text type="secondary">No. Proposal:</Typography.Text>
            <Typography.Text>{nonce.toNumber()}</Typography.Text>
          </Space>
        </Col>
        <Col>
          <Space direction="vertical">
            <Typography.Text type="secondary">Mechanism</Typography.Text>
            <Typography.Text>{Object.keys(mechanism)[0]}</Typography.Text>
          </Space>
        </Col>
        <Col>
          <Space direction="vertical">
            <Typography.Text type="secondary">Token</Typography.Text>
            <Typography.Text>{shortenAddress(mint.toBase58())}</Typography.Text>
          </Space>
        </Col>
        <Col>
          <Space direction="vertical">
            <Typography.Text type="secondary">
              Circulating Supply
            </Typography.Text>
            <Typography.Text>{circulatingSupply.toString()}</Typography.Text>
          </Space>
        </Col>
        <Col span={24}>
          <Button
            type="primary"
            onClick={() => history.push(`dao/${daoAddress}`)}
            block
          >
            Go to DAO
          </Button>
        </Col>
      </Row>
    </Card>
  )
}

export default DaoCard
