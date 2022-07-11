import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { isAddress } from '@interdao/core'
import { utils } from '@project-serum/anchor'

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
        [ZetaDepositIds.tokenProgram]: utils.token.TOKEN_PROGRAM_ID.toBase58(),
      }
      return confirm(ZetaDepositIdl, { ...defaultData, ...templateData })
    } catch (er: any) {
      window.notify({ type: 'error', description: er.message })
    }
  }, [confirm, daoData, templateData])

  const disabled =
    !templateData[ZetaDepositIds.amount] ||
    !isAddress(templateData[ZetaDepositIds.authority]) ||
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
          id={ZetaDepositIds.zetaGroup}
          title="zetaGroup"
          placeholder="zetaGroup"
        />
      </Col>
      <Col span={24}>
        <AddressInput
          id={ZetaDepositIds.marginAccount}
          title="marginAccount"
          placeholder="marginAccount"
        />
      </Col>

      <Col span={24}>
        <AddressInput
          id={ZetaDepositIds.vault}
          title="vault"
          placeholder="vault"
        />
      </Col>
      <Col span={24}>
        <AddressInput
          id={ZetaDepositIds.userTokenAccount}
          title="userTokenAccount"
          placeholder="userTokenAccount"
        />
      </Col>
      <Col span={24}>
        <AddressInput
          id={ZetaDepositIds.socializedLossAccount}
          title="socializedLossAccount"
          placeholder="socializedLossAccount"
        />
      </Col>
      <Col span={24}>
        <AddressInput
          id={ZetaDepositIds.authority}
          title="authority"
          placeholder="authority"
          defaultValue={daoData.master.toBase58()}
        />
      </Col>
      <Col span={24}>
        <AddressInput
          id={ZetaDepositIds.state}
          title="state"
          placeholder="state"
        />
      </Col>
      <Col span={24}>
        <AddressInput
          id={ZetaDepositIds.greeks}
          title="greeks"
          placeholder="greeks"
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
