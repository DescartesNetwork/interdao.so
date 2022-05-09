import { useCallback, useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { PublicKey } from '@solana/web3.js'
import { utils } from '@project-serum/anchor'
import BN from 'bn.js'
// @ts-ignore
import * as soproxABI from 'soprox-abi'
import { account } from '@senswap/sen-js'

import { Button, Col, Input, Row, Space, Typography } from 'antd'
import { MintSelection } from 'shared/antd/mint'

import { ProposalReturnType } from 'app/view/templates/types'
import { AppDispatch, AppState } from 'app/model'
import useMintDecimals from 'shared/hooks/useMintDecimals'
import {
  setImgBackground,
  setTx,
  setVisible,
} from 'app/model/template.controller'
import configs from 'app/configs'
import BG_SOLANA from 'app/static/images/templates/bg-spl.png'
import NumericInput from 'shared/antd/numericInput'

const {
  manifest: { appId },
} = configs

export const NAME = 'spl/transfer'

export const toData = (amount = new BN(0)) => {
  const schema = [
    { key: 'code', type: 'u8' },
    { key: 'amount', type: 'u64' },
  ]
  const buf = new soproxABI.struct(schema, {
    code: 3,
    amount: BigInt(amount.toString()),
  }).toBuffer()
  return buf
}

export const buildTransferSplvalue = (
  amount: string | number | BN,
  src: string,
  dst: string,
  payer: string,
) => {
  const value: ProposalReturnType = {
    name: NAME,
    data: toData(new BN(amount)),
    accounts: {
      src: {
        pubkey: new PublicKey(src),
        isWritable: true,
        isSigner: false,
        isMaster: false,
      },
      dst: {
        pubkey: new PublicKey(dst),
        isWritable: true,
        isSigner: false,
        isMaster: false,
      },
      payer: {
        pubkey: new PublicKey(payer),
        isWritable: true,
        isSigner: true,
        isMaster: true,
      },
    },
    programId: utils.token.TOKEN_PROGRAM_ID,
  }
  return value
}

type TransferSplPluginProps = {
  daoAddress: string
}

const TransferSplPlugin = ({ daoAddress = '' }: TransferSplPluginProps) => {
  const [value, setValue] = useState('')
  const [mintAddress, setMintAddress] = useState('')
  const [receiverAddress, setReceiverAddress] = useState('')
  const [srcAddress, setSrcAddress] = useState('')
  const [dstAddress, setDstAddress] = useState('')

  const [amount, setAmount] = useState('')
  const {
    dao: { daoData },
  } = useSelector((state: AppState) => state)
  const decimals = useMintDecimals(mintAddress)
  const dispatch = useDispatch<AppDispatch>()
  const history = useHistory()
  const senderAddress = useMemo(() => {
    const { master } = daoData[daoAddress] || {}
    return master?.toBase58() || ''
  }, [daoData, daoAddress])

  const valid = useMemo(() => {
    return Boolean(
      amount && account.isAddress(srcAddress) && account.isAddress(dstAddress),
    )
  }, [amount, srcAddress, dstAddress])

  const confirm = useCallback(async () => {
    if (!valid) return dispatch(setTx(undefined))
    const re = buildTransferSplvalue(
      amount,
      srcAddress,
      dstAddress,
      senderAddress,
    )

    await dispatch(setTx(re))
    await dispatch(setImgBackground(BG_SOLANA))
    await dispatch(setVisible(false))
    return history.push(`/app/${appId}/dao/${daoAddress}/new-proposal`)
  }, [
    valid,
    dispatch,
    amount,
    srcAddress,
    dstAddress,
    senderAddress,
    history,
    daoAddress,
  ])

  const close = useCallback(async () => {
    setValue('')
    setMintAddress('')
    setReceiverAddress('')
    await dispatch(setTx(undefined))
    return dispatch(setVisible(false))
  }, [dispatch])

  const setSourceAddress = useCallback(async () => {
    if (account.isAddress(senderAddress) && account.isAddress(mintAddress)) {
      const pubkey = await utils.token.associatedAddress({
        owner: new PublicKey(senderAddress),
        mint: new PublicKey(mintAddress),
      })
      setSrcAddress(pubkey.toBase58())
    } else setSrcAddress('')
  }, [mintAddress, senderAddress])

  const setDestinationAddress = useCallback(async () => {
    if (account.isAddress(receiverAddress) && account.isAddress(mintAddress)) {
      const pubkey = await utils.token.associatedAddress({
        owner: new PublicKey(receiverAddress),
        mint: new PublicKey(mintAddress),
      })
      setDstAddress(pubkey.toBase58())
    } else setDstAddress('')
  }, [mintAddress, receiverAddress])

  const getAmount = useCallback(() => {
    if (Number(value) && decimals)
      setAmount(String(Number(value) * 10 ** decimals))
    else setAmount('')
  }, [decimals, value])

  useEffect(() => {
    setSourceAddress()
  }, [setSourceAddress])

  useEffect(() => {
    setDestinationAddress()
  }, [setDestinationAddress])

  useEffect(() => {
    getAmount()
  }, [getAmount])

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Space direction="vertical" size={4} style={{ width: '100%' }}>
          <Typography.Text type="secondary">Transfer</Typography.Text>
          <NumericInput
            className="border-less"
            placeholder="Input Amount"
            value={value}
            onValue={(value) => setValue(value || '')}
            prefix={
              <MintSelection
                value={mintAddress}
                onChange={setMintAddress}
                style={{ marginLeft: -7 }}
              />
            }
          />
        </Space>
      </Col>
      <Col span={24}>
        <Space direction="vertical" size={4} style={{ width: '100%' }}>
          <Typography.Text type="secondary">
            Sender's Wallet Address
          </Typography.Text>
          <Input
            className="border-less"
            placeholder="Input Sender's Wallet Address"
            value={senderAddress}
          />
        </Space>
      </Col>
      <Col span={24}>
        <Space direction="vertical" size={4} style={{ width: '100%' }}>
          <Typography.Text type="secondary">
            Receiver's Wallet Address
          </Typography.Text>
          <Input
            className="border-less"
            placeholder="Input Receiver's Wallet Address"
            value={receiverAddress}
            onChange={(e) => setReceiverAddress(e.target.value || '')}
          />
        </Space>
      </Col>
      <Col span={24} />
      <Col span={24} style={{ textAlign: 'right' }}>
        <Space>
          <Button type="text" onClick={close}>
            Close
          </Button>
          <Button type="primary" onClick={confirm} disabled={!valid}>
            Continue
          </Button>
        </Space>
      </Col>
      {/* <TemplateInfo content="" /> */}
    </Row>
  )
}

export default TransferSplPlugin
