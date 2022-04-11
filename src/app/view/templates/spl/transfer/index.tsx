import { useCallback, useState, Fragment, ChangeEvent } from 'react'
import { PublicKey, SystemProgram } from '@solana/web3.js'
import { utils } from '@project-serum/anchor'
import { BN } from 'bn.js'
// @ts-ignore
import * as soproxABI from 'soprox-abi'

import { Button, Card, Col, Input, Modal, Row, Space, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import MintSelection from 'app/components/mintSelection'
import { MintSymbol } from 'shared/antd/mint'

import { ProposalAccountType, ProposalDataType } from 'app/view/templates/types'
import { useAccountBalanceByMintAddress } from 'shared/hooks/useAccountBalance'
import { numeric } from 'shared/util'

export const toData = (amount = new BN(0)) => {
  const schema = [
    { key: 'code', type: 'u8' },
    { key: 'amount', type: 'u64' },
  ]
  const buf = new soproxABI.struct(schema, {
    code: 3,
    amount: BigInt(amount.toString()),
  })
  return buf
}

export type TransferSplPluginValueType = {
  name: 'spl/transfer'
  data: ProposalDataType
  accounts: {
    src: ProposalAccountType
    dst: ProposalAccountType
    payer: ProposalAccountType
  }
  programId: PublicKey
}

const DEFAULT_VALUE: TransferSplPluginValueType = {
  name: 'spl/transfer',
  data: toData(),
  accounts: {
    src: {
      pubkey: SystemProgram.programId,
      isWritable: true,
      isSigner: false,
      isMaster: false,
    },
    dst: {
      pubkey: SystemProgram.programId,
      isWritable: true,
      isSigner: false,
      isMaster: false,
    },
    payer: {
      pubkey: SystemProgram.programId,
      isWritable: true,
      isSigner: true,
      isMaster: true,
    },
  },
  programId: utils.token.TOKEN_PROGRAM_ID,
}

export type TransferSplPluginProps = {
  daoAddress: string
  selected?: string
  onChange?: (value: TransferSplPluginValueType) => void
  onClick?: (value: string) => void
}

const TransferSplPlugin = ({
  daoAddress = '',
  selected = '',
  onChange = () => {},
  onClick = () => {},
}: TransferSplPluginProps) => {
  const [visible, setVisible] = useState(false)
  const [amount, setAmount] = useState('')
  const [mintAddress, setMintAddress] = useState('')
  const [receiverAddress, setReceiverAddress] = useState('')
  const { balance } = useAccountBalanceByMintAddress(mintAddress)

  const _onClick = useCallback(() => {
    onClick(DEFAULT_VALUE.name)
    return setVisible(true)
  }, [onClick])

  return (
    <Fragment>
      <Card
        onClick={_onClick}
        style={{ cursor: 'pointer' }}
        bordered={selected === DEFAULT_VALUE.name}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Typography.Title level={5} type="secondary">
              SPL/Transfer
            </Typography.Title>
          </Col>
        </Row>
      </Card>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        closeIcon={<IonIcon name="close-outline" />}
        footer={null}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Typography.Title level={5} type="secondary">
              SPL/Transfer
            </Typography.Title>
          </Col>
          <Col span={24}>
            <Row gutter={[4, 4]} justify="end">
              <Col span={24}>
                <Input
                  placeholder="Input Amount"
                  value={amount}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setAmount(e.target.value || '')
                  }
                  prefix={
                    <MintSelection
                      value={mintAddress}
                      onChange={setMintAddress}
                      style={{ marginLeft: -7 }}
                    />
                  }
                  suffix={
                    <Button
                      type="text"
                      style={{ marginRight: -7 }}
                      onClick={() => setAmount(balance.toString())}
                    >
                      MAX
                    </Button>
                  }
                />
              </Col>
              <Col>
                <Space>
                  <Typography.Text type="secondary" className="caption">
                    Available:
                  </Typography.Text>
                  <Typography.Text className="caption">
                    {numeric(balance).format('0,0.[00]')}
                  </Typography.Text>
                  <Typography.Text className="caption">
                    <MintSymbol mintAddress={mintAddress} />
                  </Typography.Text>
                </Space>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Input
              placeholder="Input Receiver Address"
              value={receiverAddress}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setReceiverAddress(e.target.value || '')
              }
            />
          </Col>
        </Row>
      </Modal>
    </Fragment>
  )
}

export default TransferSplPlugin
