import { useCallback, useEffect, useState } from 'react'
import IPFS from 'shared/pdb/ipfs'

import { Col, Image, Row, Space, Typography } from 'antd'
import CardRegmie from './daoRule/cardRegmie'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'
import { DaoDataProps } from './daoRule'
import { MetaData } from './metaDataForm'

const ConfirmCreate = ({
  daoData,
  cid,
}: {
  daoData: DaoDataProps
  cid: string
}) => {
  const { regime, mintAddress, supply } = daoData
  const [metaData, setMetaData] = useState<MetaData>()

  const getMetaData = useCallback(async () => {
    if (!cid) return setMetaData(undefined)
    try {
      const ipfs = new IPFS()
      const data = await ipfs.get(cid)
      setMetaData(data)
    } catch (err: any) {
      window.notify({ type: 'error', description: err.message })
    }
  }, [cid])

  useEffect(() => {
    getMetaData()
  }, [getMetaData])

  return (
    <Row gutter={[24, 24]}>
      <Col span={12}>
        <Space direction="vertical" size={24}>
          <Space direction="vertical">
            <Typography.Text type="secondary">Name of DAO</Typography.Text>
            <Typography.Title level={1}>{metaData?.daoName}</Typography.Title>
          </Space>
          <Space direction="vertical">
            <Typography.Text>DAO Regmie</Typography.Text>
            <CardRegmie regmie={regime} />
          </Space>
        </Space>
      </Col>
      <Col span={12}>
        <Space direction="vertical" size={24}>
          <Space direction="vertical">
            <Typography.Text type="secondary">Name of DAO</Typography.Text>
            <Space>
              <MintAvatar mintAddress={mintAddress} size={48} />
              <Typography.Title level={1}>
                <MintSymbol mintAddress={mintAddress} />
              </Typography.Title>
            </Space>
          </Space>
          <Space direction="vertical">
            <Typography.Text>DAO Logo</Typography.Text>
            <Image src={metaData?.image?.toString()} preview={false} />
          </Space>
        </Space>
      </Col>
      <Col span={24}>
        <Space direction="vertical">
          <Typography.Text type="secondary">Total power</Typography.Text>
          <Typography.Title level={1}>{supply?.toNumber()}</Typography.Title>
        </Space>
      </Col>
      <Col span={24}>
        <Space direction="vertical">
          <Typography.Text type="secondary">Description</Typography.Text>
          <Typography.Text>{metaData?.description}</Typography.Text>
        </Space>
      </Col>
    </Row>
  )
}

export default ConfirmCreate
