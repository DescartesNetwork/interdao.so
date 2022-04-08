import { useCallback, useMemo, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { ConsensusMechanisms, ConsensusQuorums } from '@interdao/core'
import { account } from '@senswap/sen-js'
import { useWallet } from '@senhub/providers'
import { BN } from 'bn.js'

import {
  Button,
  Col,
  DatePicker,
  Radio,
  RadioChangeEvent,
  Row,
  Space,
  Typography,
} from 'antd'
import IonIcon from 'shared/antd/ionicon'
import Templates from './templates'

import configs from 'app/configs'
import { explorer, shortenAddress } from 'shared/util'

const {
  manifest: { appId },
} = configs

const ProposalInitialization = () => {
  const history = useHistory()
  const { daoAddress } = useParams<{ daoAddress: string }>()
  const [consensusMechanism, setConsensusMechanism] =
    useState('StakedTokenCounter')
  const [consensusQuorum, setConsensusQuorum] = useState('Half')
  const [date, setDate] = useState(['', ''])
  const [loading, setLoading] = useState(false)
  const {
    wallet: { address: walletAddress },
  } = useWallet()

  const startDate = useMemo(
    () => Math.floor(Number(new Date(date[0])) / 1000) || 0,
    [date],
  )
  const endDate = useMemo(
    () => Math.floor(Number(new Date(date[1])) / 1000) || 0,
    [date],
  )
  const valid = useMemo(() => {
    if (!account.isAddress(daoAddress)) return false
    if (!startDate || !endDate || startDate >= endDate) return false
    return true
  }, [daoAddress, startDate, endDate])

  const onClose = useCallback(() => {
    setConsensusMechanism('StakedTokenCounter')
    setConsensusQuorum('Half')
  }, [])

  const newDao = useCallback(async () => {
    if (!valid) return
    const {
      sol: { interDao },
    } = configs
    try {
      setLoading(true)
      const { txId } = await interDao.initializeProposal(
        daoAddress,
        daoAddress, // invokedProgramAddress
        Buffer.from([]), // data
        [], // pubkeys
        [], // isSigners
        [], // isWritables
        [], // isSigners
        startDate,
        endDate,
        new BN(10 ** 6), // fee
        walletAddress, // taxman
        ConsensusMechanisms[consensusMechanism],
        ConsensusQuorums[consensusQuorum],
      )
      window.notify({
        type: 'success',
        description: 'A new DAO is created. Click here to view details.',
        onClick: () => window.open(explorer(txId), '_blank'),
      })
      return onClose()
    } catch (er: any) {
      return window.notify({
        type: 'error',
        description: er.message,
      })
    } finally {
      return setLoading(false)
    }
  }, [
    valid,
    consensusQuorum,
    consensusMechanism,
    daoAddress,
    startDate,
    endDate,
    onClose,
  ])

  return (
    <Row gutter={[24, 24]}>
      {/* Header */}
      <Col span={24}>
        <Row gutter={[24, 24]} align="bottom">
          <Col flex="auto">
            <Space>
              <Button
                type="text"
                icon={<IonIcon name="arrow-back-outline" />}
                onClick={() => history.push(`/app/${appId}/dao/${daoAddress}`)}
              />
              <Typography.Title level={3} type="secondary">
                DAO:
              </Typography.Title>
              <Typography.Title level={3}>
                {shortenAddress(daoAddress)}
              </Typography.Title>
            </Space>
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={newDao}
              disabled={!valid}
              loading={loading}
              block
            >
              New Proposal
            </Button>
          </Col>
        </Row>
      </Col>
      {/* Basic Info */}
      <Col span={24}>
        <Row gutter={[24, 24]} align="bottom">
          <Col>
            <Space direction="vertical">
              <Typography.Text type="secondary">
                Consensus Mechanism
              </Typography.Text>
              <Radio.Group
                onChange={(e: RadioChangeEvent) =>
                  setConsensusMechanism(e.target.value || 'StakedTokenCounter')
                }
                value={consensusMechanism}
              >
                <Radio value="StakedTokenCounter">StakedTokenCounter</Radio>
                <Radio value="LockedTokenCounter">LockedTokenCounter</Radio>
              </Radio.Group>
            </Space>
          </Col>
          <Col>
            <Space direction="vertical">
              <Typography.Text type="secondary">
                Consensus Quorum
              </Typography.Text>
              <Radio.Group
                onChange={(e: RadioChangeEvent) =>
                  setConsensusQuorum(e.target.value || 'Half')
                }
                value={consensusQuorum}
              >
                <Radio value="OneThird">OneThird</Radio>
                <Radio value="Half">Half</Radio>
                <Radio value="TwoThird">TwoThird</Radio>
              </Radio.Group>
            </Space>
          </Col>
          <Col>
            <Space direction="vertical">
              <Typography.Text type="secondary">Duration</Typography.Text>
              <DatePicker.RangePicker
                onChange={(_, values) => setDate(values)}
                showTime
              />
            </Space>
          </Col>
        </Row>
      </Col>
      {/* Proposal Templates */}
      <Col span={24}>
        <Templates />
      </Col>
    </Row>
  )
}

export default ProposalInitialization
