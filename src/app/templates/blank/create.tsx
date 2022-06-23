import { useCallback } from 'react'
import { useSelector } from 'react-redux'

import { Button, Col, Row, Space } from 'antd'

import { AppState } from 'app/model'
import { BlankIdl, BlankIds } from '../blank/configs'
import { PropsCreateComponent } from '../index'
import { useConfirmIdl } from '../hooks/useConfirmIdl'

const Create = ({ daoAddress = '' }: PropsCreateComponent) => {
  const daoData = useSelector((state: AppState) => state.daos[daoAddress])
  const { confirm, close } = useConfirmIdl()

  const onConfirm = useCallback(async () => {
    const defaultData: Record<string, string> = {
      [BlankIds.code]: '2',
      [BlankIds.lamports]: '0',
      [BlankIds.source]: daoData.master.toBase58(),
      [BlankIds.destination]: daoData.master.toBase58(),
      [BlankIds.authority]: daoData.master.toBase58(),
    }
    return confirm(BlankIdl, { ...defaultData })
  }, [confirm, daoData.master])

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
