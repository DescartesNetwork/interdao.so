import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { isAddress } from '@interdao/core'

import { Button, Col, Row, Space } from 'antd'
import { NumberInput, MintInput, AddressInput } from 'templates/components'

import { AppState } from 'model'
import { SplApproveIdl, SplApproveIds } from '../spl-approve/configs'
import { PropsCreateComponent } from '../index'
import { useConfirmIdl } from '../hooks/useConfirmIdl'

const Create = ({ daoAddress = '' }: PropsCreateComponent) => {
  const daoData = useSelector((state: AppState) => state.daos[daoAddress])
  const templateData = useSelector((state: AppState) => state.template.data)

  const { confirm, close } = useConfirmIdl()

  const onConfirm = useCallback(async () => {
    const defaultData = {
      [SplApproveIds.code]: '4',
      [SplApproveIds.source]: daoData.master.toBase58(),
      [SplApproveIds.authority]: daoData.master.toBase58(),
    }
    return confirm(SplApproveIdl, { ...defaultData, ...templateData })
  }, [confirm, daoData.master, templateData])

  const disabled =
    !templateData[SplApproveIds.amount] ||
    !isAddress(templateData[SplApproveIds.delegate]) ||
    !templateData[SplApproveIds.mint]

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <NumberInput
          id={SplApproveIds.amount}
          title="Amount"
          prefix={<MintInput id={SplApproveIds.mint} />}
        />
      </Col>
      <Col span={24}>
        <AddressInput
          id={SplApproveIds.source}
          defaultValue={daoData.master.toBase58()}
          title="Source's Wallet Address"
          placeholder="Input Source's Wallet Address"
          readOnly
        />
      </Col>
      <Col span={24}>
        <AddressInput
          id={SplApproveIds.delegate}
          title="Delegate's Wallet Address"
          placeholder="Input Delegate's Wallet Address"
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
