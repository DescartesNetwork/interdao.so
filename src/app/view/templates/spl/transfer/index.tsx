import { useCallback, useState, Fragment, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { PublicKey } from '@solana/web3.js'
import { utils } from '@project-serum/anchor'
import BN from 'bn.js'
// @ts-ignore
import * as soproxABI from 'soprox-abi'

import { Button, Card, Col, Input, Modal, Row, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import { MintSelection, MintSymbol } from 'shared/antd/mint'

import { ProposalReturnType } from 'app/view/templates/types'
import { AppState } from 'app/model'
import { account } from '@senswap/sen-js'
import useMintDecimals from 'shared/hooks/useMintDecimals'

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

export type TransferSplPluginProps = {
  daoAddress: string
  selected?: string
  onChange?: (value: ProposalReturnType | undefined) => void
  onClick?: (value: string) => void
}

const TransferSplPlugin = ({
  daoAddress = '',
  selected = '',
  onChange = () => {},
  onClick = () => {},
}: TransferSplPluginProps) => {
  const [visible, setVisible] = useState(false)
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

  const senderAddress = useMemo(() => {
    const { master } = daoData[daoAddress] || {}
    return master?.toBase58() || ''
  }, [daoData, daoAddress])

  const _onClick = useCallback(() => {
    onClick(NAME)
    return setVisible(true)
  }, [onClick])

  // Source Address
  useEffect(() => {
    ;(async () => {
      if (account.isAddress(senderAddress) && account.isAddress(mintAddress)) {
        const pubkey = await utils.token.associatedAddress({
          owner: new PublicKey(senderAddress),
          mint: new PublicKey(mintAddress),
        })
        setSrcAddress(pubkey.toBase58())
      } else setSrcAddress('')
    })()
  }, [senderAddress, mintAddress])
  // Destination Address
  useEffect(() => {
    ;(async () => {
      if (
        account.isAddress(receiverAddress) &&
        account.isAddress(mintAddress)
      ) {
        const pubkey = await utils.token.associatedAddress({
          owner: new PublicKey(receiverAddress),
          mint: new PublicKey(mintAddress),
        })
        setDstAddress(pubkey.toBase58())
      } else setDstAddress('')
    })()
  }, [receiverAddress, mintAddress])
  // Amount
  useEffect(() => {
    if (Number(value) && decimals)
      setAmount(String(Number(value) * 10 ** decimals))
    else setAmount('')
  }, [value, decimals])

  const ok = useMemo(() => {
    return Boolean(
      amount && account.isAddress(srcAddress) && account.isAddress(dstAddress),
    )
  }, [amount, srcAddress, dstAddress])

  const onOk = useCallback(() => {
    if (!ok) return onChange(undefined)
    const re = buildTransferSplvalue(
      amount,
      srcAddress,
      dstAddress,
      senderAddress,
    )
    setVisible(false)
    return onChange(re)
  }, [ok, amount, srcAddress, dstAddress, senderAddress, onChange])

  const onClear = useCallback(() => {
    setValue('')
    setMintAddress('')
    setReceiverAddress('')
    setVisible(false)
    return onChange(undefined)
  }, [onChange])

  return (
    <Fragment>
      <Card
        onClick={_onClick}
        style={{ cursor: 'pointer' }}
        bordered={selected === NAME}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Typography.Title level={5} type="secondary">
              SPL/Transfer
            </Typography.Title>
          </Col>
          {ok ? (
            <Col span={24}>
              <Typography.Text type="secondary">Send </Typography.Text>
              <Typography.Text>
                {value} <MintSymbol mintAddress={mintAddress} />
              </Typography.Text>
              <Typography.Text type="secondary"> to </Typography.Text>
              <Typography.Text>{receiverAddress}.</Typography.Text>
            </Col>
          ) : (
            <Col span={24}>
              <Typography.Text type="secondary">
                Please input the params
              </Typography.Text>
            </Col>
          )}
        </Row>
      </Card>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        closeIcon={<IonIcon name="close-outline" />}
        footer={null}
      >
        <Row gutter={[16, 16]} justify="end">
          <Col span={24}>
            <Typography.Title level={5} type="secondary">
              SPL/Transfer
            </Typography.Title>
          </Col>
          <Col span={24} />
          <Col span={24}>
            <Input
              placeholder="Input Amount"
              value={value}
              onChange={(e) => setValue(e.target.value || '')}
              prefix={
                <MintSelection
                  value={mintAddress}
                  onChange={setMintAddress}
                  style={{ marginLeft: -7 }}
                />
              }
            />
          </Col>
          <Col span={24}>
            <Row gutter={[4, 4]}>
              <Col span={24}>
                <Typography.Text type="secondary">
                  Sender's Wallet Address
                </Typography.Text>
              </Col>
              <Col span={24}>
                <Input
                  placeholder="Input Sender's Wallet Address"
                  prefix={
                    <Button
                      type="text"
                      style={{ marginLeft: -7 }}
                      icon={<IonIcon name="log-out-outline" />}
                    />
                  }
                  value={senderAddress}
                />
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={[4, 4]}>
              <Col span={24}>
                <Typography.Text type="secondary">
                  Receiver's Wallet Address
                </Typography.Text>
              </Col>
              <Col span={24}>
                <Input
                  placeholder="Input Receiver's Wallet Address"
                  prefix={
                    <Button
                      type="text"
                      style={{ marginLeft: -7 }}
                      icon={<IonIcon name="log-in-outline" />}
                    />
                  }
                  value={receiverAddress}
                  onChange={(e) => setReceiverAddress(e.target.value || '')}
                />
              </Col>
            </Row>
          </Col>
          <Col>
            <Button
              type="text"
              onClick={onClear}
              icon={<IonIcon name="trash-outline" />}
            >
              Clear
            </Button>
          </Col>
          <Col>
            <Button type="primary" onClick={onOk} disabled={!ok}>
              OK
            </Button>
          </Col>
        </Row>
      </Modal>
    </Fragment>
  )
}

export default TransferSplPlugin
