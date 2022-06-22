import { useCallback } from 'react'
import { useSelector } from 'react-redux'

import { Button, Col, Row, Space } from 'antd'
import { NumberInput, MintInput, AddressInput } from 'app/templates/components'

import { AppState } from 'app/model'
import { SplTransferIdl, SplTransferIds } from '../spl-transfer/configs'
import { PropsCreateComponent } from '../index'
import { useConfirmIdl } from '../hooks/useConfirmIdl'

const Create = ({ daoAddress = '' }: PropsCreateComponent) => {
  const daoData = useSelector((state: AppState) => state.daos[daoAddress])
  const templateData = useSelector((state: AppState) => state.template.data)
  const { confirm, close } = useConfirmIdl()

  const onConfirm = useCallback(async () => {
    const defaultData = {
      [SplTransferIds.code]: '3',
      [SplTransferIds.authority]: daoData.master.toBase58(),
      [SplTransferIds.source]: daoData.master.toBase58(),
    }
    return confirm(SplTransferIdl, { ...defaultData, ...templateData })
  }, [confirm, daoData.master, templateData])

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <NumberInput
          id={SplTransferIds.amount}
          title="Transfer"
          prefix={<MintInput id={SplTransferIds.mint} />}
        />
      </Col>
      <Col span={24}>
        <AddressInput
          id={SplTransferIds.source}
          title="Sender's Wallet Address"
          placeholder="Input Sender's Wallet Address"
          disabled
          defaultValue={daoData.master.toBase58()}
        />
      </Col>
      <Col span={24}>
        <AddressInput
          id={SplTransferIds.destination}
          title="Receiver's Wallet Address"
          placeholder="Input Receiver's Wallet Address"
        />
      </Col>
      <Col span={24} />
      <Col span={24} style={{ textAlign: 'right' }}>
        <Space>
          <Button type="text" onClick={close}>
            Close
          </Button>
          <Button type="primary" onClick={onConfirm} disabled={false}>
            Continue
          </Button>
        </Space>
      </Col>
    </Row>
  )
}

export default Create
