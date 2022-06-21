import { useCallback, useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { PublicKey } from '@solana/web3.js'
import { utils } from '@project-serum/anchor'
import BN from 'bn.js'
// @ts-ignore
import * as soproxABI from 'soprox-abi'
import { account } from '@senswap/sen-js'

import { Button, Col, Row, Space } from 'antd'

import { AppDispatch, AppState } from 'app/model'
import { onChangeTemplateData } from 'app/model/template.controller'
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
  const { parserIxDataNoPrefix } = useParser()
  const dispatch = useDispatch<AppDispatch>()
  const daoData = useSelector((state: AppState) => state.daos[daoAddress])

  const { metaData: daoMetaData } = useMetaData(daoAddress)

  const confirm = useCallback(async () => {
    const ix = await parserIxDataNoPrefix(SplTransferIdl)
  }, [parserIxDataNoPrefix])

  const generateData = useCallback(async () => {
    dispatch(
      onChangeTemplateData({
        id: SplTransferIds.payer,
        value: daoData.master.toBase58(),
      }),
    )
  }, [daoData.master, dispatch])
  useEffect(() => {
    generateData()
  }, [generateData])

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <NumberInput id={SplTransferIds.code} title="Code" />
      </Col>
      <Col span={24}>
        <NumberInput
          id={SplTransferIds.amount}
          title="Transfer"
          prefix={<MintInput id="mint" />}
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
