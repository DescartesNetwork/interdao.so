import { useCallback } from 'react'

import { Button, Col, Row, Space } from 'antd'

import { BlankIdl, BlankIds } from '../blank/configs'
import { PropsCreateComponent } from '../index'
import { useConfirmIdl } from '../hooks/useConfirmIdl'
import { useDaoData } from 'app/hooks/dao'

const Create = ({ daoAddress = '' }: PropsCreateComponent) => {
  const daoData = useDaoData(daoAddress)
  const { confirm, close } = useConfirmIdl()

  const onConfirm = useCallback(async () => {
    try {
      if (!daoData) throw new Error('Invalid Dao Data')
      const defaultData: Record<string, string> = {
        [BlankIds.code]: '2',
        [BlankIds.lamports]: '0',
        [BlankIds.source]: daoData.master.toBase58(),
        [BlankIds.destination]: daoData.master.toBase58(),
        [BlankIds.authority]: daoData.master.toBase58(),
      }
      return confirm(BlankIdl, { ...defaultData })
    } catch (error: any) {
      window.notify({ type: 'error', description: error.message })
    }
  }, [confirm, daoData])

  return (
    <Row gutter={[24, 24]}>
      <Col span={24} style={{ textAlign: 'right' }}>
        <Space>
          <Button type="text" onClick={close}>
            Close
          </Button>
          <Button type="primary" onClick={onConfirm}>
            Continue
          </Button>
        </Space>
      </Col>
    </Row>
  )
}

export default Create
