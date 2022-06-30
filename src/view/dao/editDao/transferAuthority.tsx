import { ChangeEvent, useState } from 'react'
import { account } from '@senswap/sen-js'
import { util } from '@sentre/senhub'

import { Col, Input, Row, Space, Typography } from 'antd'
import RowSpaceVertical from 'components/rowSpaceVertical'
import ActionButton from './actionButton'
import IonIcon from '@sentre/antd-ionicon'

import configs from 'configs'

const {
  sol: { interDao },
} = configs

const TransferAuthority = ({ daoAddress }: { daoAddress: string }) => {
  const [authority, setAuthority] = useState('')
  const [loading, setLoading] = useState(false)

  const updateAuthority = async () => {
    if (!account.isAddress(authority)) return
    try {
      setLoading(true)
      const { txId } = await interDao.transferAuthority(authority, daoAddress)
      return window.notify({
        type: 'success',
        description:
          'Transfer authority successfully. Click here to view details',
        onClick: () => window.open(util.explorer(txId), '_blank'),
      })
    } catch (er: any) {
      return window.notify({ type: 'error', description: er.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Space size={12}>
          <IonIcon name="alert-circle-outline" />
          <Typography.Text type="secondary" className="caption">
            Your current account will lose the DAO control when you transfer
            authority.
          </Typography.Text>
        </Space>
      </Col>
      <Col span={24}>
        <RowSpaceVertical
          style={{ width: '100%' }}
          label="Transfer to author"
          value={
            <Input
              placeholder="E.g. Agt8..."
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setAuthority(e.target.value)
              }
              className="border-less"
            />
          }
        />
      </Col>
      <Col span={24} />
      <Col span={24}>
        <ActionButton
          loading={loading}
          daoAddress={daoAddress}
          onSave={updateAuthority}
        />
      </Col>
    </Row>
  )
}

export default TransferAuthority
