import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Col, Row, Space } from 'antd'
import { NumberInput, MintInput, AddressInput } from 'app/templates/components'

import { AppDispatch, AppState } from 'app/model'
import { setTemplateData } from 'app/model/template.controller'
import useMetaData from 'app/hooks/useMetaData'
import { useParser } from '../hooks/useParser'
import { SplTransferIdl, SplTransferIds } from '../spl-transfer/configs'
import { PropsCreateComponent } from '../index'

const Create = ({ daoAddress = '' }: PropsCreateComponent) => {
  const dispatch = useDispatch<AppDispatch>()
  const daoData = useSelector((state: AppState) => state.daos[daoAddress])
  const { metaData: daoMetaData } = useMetaData(daoAddress)
  const { parserIxDataNoPrefix } = useParser()

  const generateData = useCallback(async () => {
    dispatch(
      setTemplateData({
        id: SplTransferIds.authority,
        value: daoData.master.toBase58(),
      }),
    )
    dispatch(
      setTemplateData({
        id: SplTransferIds.code,
        value: '3',
      }),
    )
  }, [daoData.master, dispatch])
  useEffect(() => {
    generateData()
  }, [generateData])

  const confirm = useCallback(async () => {
    try {
      const ix = await parserIxDataNoPrefix(SplTransferIdl)
      console.log(
        'ix',
        ix.keys.map((e) => e.pubkey.toBase58()),
      )
    } catch (error) {
      console.log('error', error)
    }
  }, [parserIxDataNoPrefix])

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
          disabled={daoMetaData?.daoType === 'multisig-dao'}
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
          <Button type="text" onClick={() => {}}>
            Close
          </Button>
          <Button type="primary" onClick={confirm} disabled={false}>
            Continue
          </Button>
        </Space>
      </Col>
    </Row>
  )
}

export default Create
