import { useCallback, useState } from 'react'

import { Button, Col, Empty, Row, Space, Typography } from 'antd'

import { ZetaCreateIdl, ZetaCreateIds } from './configs'
import { PropsCreateComponent } from '../index'
import { useConfirmIdl } from '../hooks/useConfirmIdl'
import { useDaoData } from 'hooks/dao'
import { zetaCreateParams } from './zetaCreateHelper'

const Create = ({ daoAddress = '' }: PropsCreateComponent) => {
  const daoData = useDaoData(daoAddress)
  const { confirm, close } = useConfirmIdl()
  const [loading, setLoading] = useState(false)

  const onConfirm = useCallback(async () => {
    try {
      if (!daoData) throw new Error('Invalid DAO data')
      setLoading(true)
      const masterAddress = daoData.master.toBase58()
      const { marginAccount, zetaGroup, systemProgram, zetaProgram } =
        await zetaCreateParams(masterAddress)

      const defaultData = {
        [ZetaCreateIds.zetaGroup]: zetaGroup.toBase58(),
        [ZetaCreateIds.marginAccount]: marginAccount.toBase58(),
        [ZetaCreateIds.authority]: masterAddress,
        [ZetaCreateIds.payer]: masterAddress,
        [ZetaCreateIds.systemProgram]: systemProgram.toBase58(),
        [ZetaCreateIds.zetaProgram]: zetaProgram.toBase58(),
      }
      return confirm(ZetaCreateIdl, defaultData, true)
    } catch (er: any) {
      window.notify({ type: 'error', description: er.message })
    } finally {
      setLoading(false)
    }
  }, [confirm, daoData])

  if (!daoData) return <Empty description="Invalid DAO data" />

  return (
    <Row gutter={[24, 24]} justify="space-between" style={{ height: '100%' }}>
      <Col span={24}>
        <Typography.Text type="secondary">
          Margin account must be created first to store assets and then can
          perform other transactions
        </Typography.Text>
      </Col>
      <Col span={24}>
        <Row style={{ height: '100%' }} align="bottom">
          <Col span={24} style={{ textAlign: 'right' }}>
            <Space>
              <Button type="text" onClick={close}>
                Close
              </Button>
              <Button type="primary" onClick={onConfirm} loading={loading}>
                Continue
              </Button>
            </Space>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Create
