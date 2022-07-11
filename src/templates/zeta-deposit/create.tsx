import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { isAddress } from '@interdao/core'

import { Button, Col, Empty, Row, Space } from 'antd'
import { NumberInput, MintInput, AddressInput } from 'templates/components'

import { AppState } from 'model'
import { ZetaDepositIdl, ZetaDepositIds } from '../zeta-deposit/configs'
import { PropsCreateComponent } from '../index'
import { useConfirmIdl } from '../hooks/useConfirmIdl'
import { useDaoData } from 'hooks/dao'

const Create = ({ daoAddress = '' }: PropsCreateComponent) => {
  const daoData = useDaoData(daoAddress)
  const templateData = useSelector((state: AppState) => state.template.data)
  const { confirm, close } = useConfirmIdl()

  const onConfirm = useCallback(async () => {
    try {
      if (!daoData) throw new Error('Invalid DAO data')
      const defaultData = {
        [ZetaDepositIds.code]: '3',
        [ZetaDepositIds.authority]: daoData.master.toBase58(),
        [ZetaDepositIds.source]: daoData.master.toBase58(),
      }
      return confirm(ZetaDepositIdl, { ...defaultData, ...templateData })
    } catch (er: any) {
      window.notify({ type: 'error', description: er.message })
    }
  }, [confirm, daoData, templateData])

  const disabled =
    !templateData[ZetaDepositIds.amount] ||
    !isAddress(templateData[ZetaDepositIds.destination]) ||
    !templateData[ZetaDepositIds.mint]

  if (!daoData) return <Empty description="Invalid DAO data" />
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <NumberInput
          id={ZetaDepositIds.amount}
          title="Deposit"
          prefix={<MintInput id={ZetaDepositIds.mint} />}
        />
      </Col>
      <Col span={24}>
        <AddressInput
          id={ZetaDepositIds.source}
          title="Sender's Wallet Address"
          placeholder="Input Sender's Wallet Address"
          readOnly
          defaultValue={daoData.master.toBase58()}
        />
      </Col>
      <Col span={24}>
        <AddressInput
          id={ZetaDepositIds.destination}
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
          <Button type="primary" onClick={onConfirm} disabled={disabled}>
            Continue
          </Button>
        </Space>
      </Col>
    </Row>
  )
}

export default Create
