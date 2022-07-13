import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { net } from '@sentre/senhub'

import { Button, Col, Empty, Row, Space } from 'antd'
import { NumberInput, MintInput } from 'templates/components'

import { AppState } from 'model'
import { ZetaDepositIdl, ZetaDepositIds } from './configs'
import { PropsCreateComponent } from '../index'
import { useConfirmIdl } from '../hooks/useConfirmIdl'
import { useDaoData } from 'hooks/dao'
import { zetaDepositParams } from './zetaDepositHelper'

export const USDC_MINT_ADDRESS = {
  testnet: '',
  devnet: '6PEh8n3p7BbCTykufbq1nSJYAZvUp6gSwEANAs1ZhsCX',
  mainnet: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
}

const Create = ({ daoAddress = '' }: PropsCreateComponent) => {
  const daoData = useDaoData(daoAddress)
  const templateData = useSelector((state: AppState) => state.template.data)
  const { confirm, close } = useConfirmIdl()
  const [loading, setLoading] = useState(false)

  const onConfirm = useCallback(async () => {
    try {
      if (!daoData) throw new Error('Invalid DAO data')
      setLoading(true)
      const {
        zetaGroup,
        marginAccount,
        vault,
        userTokenAccount,
        socializedLossAccount,
        authority,
        tokenProgram,
        state,
        greeks,
      } = await zetaDepositParams(daoData.master.toBase58())
      const defaultData = {
        [ZetaDepositIds.zetaGroup]: zetaGroup.toBase58(),
        [ZetaDepositIds.marginAccount]: marginAccount.toBase58(),
        [ZetaDepositIds.vault]: vault.toBase58(),
        [ZetaDepositIds.userTokenAccount]: userTokenAccount.toBase58(),
        [ZetaDepositIds.socializedLossAccount]:
          socializedLossAccount.toBase58(),
        [ZetaDepositIds.authority]: authority.toBase58(),
        [ZetaDepositIds.tokenProgram]: tokenProgram.toBase58(),
        [ZetaDepositIds.state]: state.toBase58(),
        [ZetaDepositIds.greeks]: greeks.toBase58(),
      }
      return confirm(ZetaDepositIdl, { ...defaultData, ...templateData }, true)
    } catch (er: any) {
      window.notify({ type: 'error', description: er.message })
    } finally {
      setLoading(false)
    }
  }, [confirm, daoData, templateData])

  const disabled = !templateData[ZetaDepositIds.amount]

  if (!daoData) return <Empty description="Invalid DAO data" />

  return (
    <Row gutter={[24, 24]} justify="space-between" style={{ height: '100%' }}>
      <Col span={24}>
        <NumberInput
          id={ZetaDepositIds.amount}
          title="Deposit"
          prefix={
            <MintInput
              id={ZetaDepositIds.mint}
              defaultValue={USDC_MINT_ADDRESS[net]}
              disabled={true}
            />
          }
        />
      </Col>
      <Col span={24}>
        <Row style={{ height: '100%' }} align="bottom">
          <Col span={24} style={{ textAlign: 'right' }}>
            <Space>
              <Button type="text" onClick={close}>
                Close
              </Button>
              <Button
                type="primary"
                onClick={onConfirm}
                disabled={disabled}
                loading={loading}
              >
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
