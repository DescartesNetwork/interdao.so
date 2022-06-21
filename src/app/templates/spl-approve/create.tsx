import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Col, Row, Space } from 'antd'
import { NumberInput, MintInput, AddressInput } from 'app/templates/components'

import { AppDispatch, AppState } from 'app/model'
import { setTemplateData } from 'app/model/template.controller'
import useMetaData from 'app/hooks/useMetaData'
import { SplApproveIdl, SplApproveIds } from '../spl-approve/configs'
import { PropsCreateComponent } from '../index'
import { useConfirmIdl } from '../hooks/useConfirmIdl'

const Create = ({ daoAddress = '' }: PropsCreateComponent) => {
  const dispatch = useDispatch<AppDispatch>()
  const daoData = useSelector((state: AppState) => state.daos[daoAddress])
  const { metaData: daoMetaData } = useMetaData(daoAddress)
  const { confirm, close } = useConfirmIdl()

  const generateData = useCallback(async () => {
    dispatch(
      setTemplateData({
        id: SplApproveIds.authority,
        value: daoData.master.toBase58(),
      }),
    )
    dispatch(
      setTemplateData({
        id: SplApproveIds.code,
        value: '4',
      }),
    )
  }, [daoData.master, dispatch])
  useEffect(() => {
    generateData()
  }, [generateData])

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
          title="Source's Wallet Address"
          placeholder="Input Source's Wallet Address"
          disabled={daoMetaData?.daoType === 'multisig-dao'}
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
          <Button
            type="primary"
            onClick={() => confirm(SplApproveIdl)}
            disabled={false}
          >
            Continue
          </Button>
        </Space>
      </Col>
    </Row>
  )
}

export default Create
