import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Col, Row, Space } from 'antd'

import { AppDispatch, AppState } from 'app/model'
import { setTemplateData } from 'app/model/template.controller'
import configs from 'app/configs'
import useMetaData from 'app/hooks/useMetaData'
import NumberInput from 'app/templates/components/numberInput'
import MintInput from 'app/templates/components/mintInput'
import AddressInput from 'app/templates/components/addressInput'
import { useParser } from 'app/templates/hooks/useParser'
import {
  SplTransferIdl,
  SplTransferIds,
} from 'app/templates/spl-transfer/configs'

const {
  manifest: { appId },
} = configs

type TransferSplPluginProps = {
  daoAddress: string
}

const TransferSplPlugin = ({ daoAddress = '' }: TransferSplPluginProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const daoData = useSelector((state: AppState) => state.daos[daoAddress])
  const { metaData: daoMetaData } = useMetaData(daoAddress)
  const { parserIxDataNoPrefix } = useParser()

  const generateData = useCallback(async () => {
    dispatch(
      setTemplateData({
        id: SplTransferIds.payer,
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
        <NumberInput id={SplTransferIds.code} title="Code" />
      </Col>
      <Col span={24}>
        <NumberInput
          id={SplTransferIds.amount}
          title="Transfer"
          prefix={<MintInput id={SplTransferIds.mint} />}
        />
      </Col>
      <Col span={24}>
        <AddressInput
          id={SplTransferIds.src}
          title="Sender's Wallet Address"
          placeholder="Input Sender's Wallet Address"
          disabled={daoMetaData?.daoType === 'multisig-dao'}
        />
      </Col>
      <Col span={24}>
        <AddressInput
          id={SplTransferIds.dst}
          title="Receiver's Wallet Address"
          placeholder="Input Receiver's Wallet Address"
        />
      </Col>
      <Col span={24}>
        <AddressInput
          id={SplTransferIds.payer}
          title="Payer"
          placeholder="Input payer's Wallet Address"
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

export default TransferSplPlugin
