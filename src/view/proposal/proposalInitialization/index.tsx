import { useCallback, useEffect, useMemo, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ConsensusMechanisms, ConsensusQuorums } from '@interdao/core'
import BN from 'bn.js'
import { CID } from 'ipfs-core'
import { util } from '@sentre/senhub'

import { Button, Card, Col, Divider, Input, Row, Space, Typography } from 'antd'
import ConsensusMechanismInput from './consensusMechanismInput'
import ConsensusQuorumInput from '../../../components/consensusQuorumInput'
import DurationInput from './durationInput'
import ProposalPreview from './proposalPreview'

import configs from 'configs'
import IPFS from 'helpers/ipfs'
import { AppState } from 'model'
import { clearTx } from 'model/template.controller'
import useMetaData from 'hooks/useMetaData'

const {
  sol: { interDao, taxman, fee },
  manifest: { appId },
} = configs

export type ProposalMetaData = {
  title: string
  description: string
  templateName: string
  templateData?: any
}

const CURRENT_TIME = Number(new Date())
const ONE_DAY = 24 * 60 * 60 * 1000
const DEFAULT_DURATION = [CURRENT_TIME + ONE_DAY, CURRENT_TIME + 15 * ONE_DAY]

const ProposalInitialization = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { daoAddress } = useParams<{ daoAddress: string }>()

  const daos = useSelector((state: AppState) => state.daos)
  const template = useSelector((state: AppState) => state.template)

  const [consensusMechanism, setConsensusMechanism] = useState(
    ConsensusMechanisms.StakedTokenCounter,
  )
  const [consensusQuorum, setConsensusQuorum] = useState(ConsensusQuorums.Half)
  const [duration, setDuration] = useState([...DEFAULT_DURATION])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  const { metaData: daoMetaData } = useMetaData(daoAddress)

  const disabled = !title || !description
  const isMultisigDAO = daoMetaData?.daoType === 'multisig-dao'

  const proposalMetaData: ProposalMetaData = useMemo(() => {
    return {
      title,
      description,
      templateName: template.templateName || '',
      templateData: template.data,
    }
  }, [description, template, title])

  const uploadMetaData = useCallback(async () => {
    const ipfs = new IPFS()
    const cid = await ipfs.set(proposalMetaData)
    const {
      multihash: { digest },
    } = CID.parse(cid)
    return digest
  }, [proposalMetaData])

  const newProposal = useCallback(async () => {
    const { authority } = daos[daoAddress]
    if (!template.tx) return
    try {
      setLoading(true)
      const digest = await uploadMetaData()

      const metadata = Buffer.from(digest)
      const { programId, data, accounts } = template.tx
      const valueAccounts = Object.values(accounts)

      const { txId, proposalAddress } = await interDao.initializeProposal(
        daoAddress,
        programId.toBase58(),
        data,
        valueAccounts.map(({ pubkey }) => pubkey),
        valueAccounts.map(({ isSigner }) => isSigner),
        valueAccounts.map(({ isWritable }) => isWritable),
        valueAccounts.map(({ isMaster }) => isMaster),
        Math.floor(duration[0] / 1000),
        Math.floor(duration[1] / 1000),
        metadata,
        consensusMechanism,
        consensusQuorum,
        {
          revenue: new BN(fee),
          revenuemanAddress: authority.toBase58(),
          tax: new BN(fee),
          taxmanAddress: taxman,
        },
      )
      window.notify({
        type: 'success',
        description:
          'Create a new proposal successfully. Click here to view details.',
        onClick: () => window.open(util.explorer(txId), '_blank'),
      })

      //Clear tx in redux
      dispatch(clearTx())
      return history.push(
        `/${appId}/dao/${daoAddress}/proposal/${proposalAddress}`,
      )
    } catch (er: any) {
      return window.notify({
        type: 'error',
        description: er.message,
      })
    } finally {
      return setLoading(false)
    }
  }, [
    consensusMechanism,
    consensusQuorum,
    daoAddress,
    daos,
    dispatch,
    duration,
    history,
    template.tx,
    uploadMetaData,
  ])

  useEffect(() => {
    if (!template.tx) return history.push(`/${appId}/dao/${daoAddress}`)
  }, [daoAddress, history, template.tx])

  return (
    <Row gutter={[24, 24]} justify="center">
      <Col xs={24} md={14}>
        <Card bordered={false}>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Typography.Title level={1}>
                Input Proposal Information
              </Typography.Title>
            </Col>
            <Col span={24} />
            <Col span={24}>
              <ProposalPreview daoAddress={daoAddress} />
            </Col>
            <Col span={24}>
              <Divider className="proposal-initialize" />
            </Col>
            <Col span={24}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Typography.Text>Title</Typography.Text>
                <Input
                  value={title}
                  placeholder="A short summary of your proposal."
                  className="border-less"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Space>
            </Col>
            <Col span={24}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Typography.Text>Description</Typography.Text>
                <Input.TextArea
                  placeholder="More detail about your proposal..."
                  name="description"
                  className="border-less"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Space>
            </Col>
            <Col span={24}>
              <DurationInput value={duration} onChange={setDuration} />
            </Col>
            {!isMultisigDAO && (
              <Col span={24}>
                <ConsensusMechanismInput
                  value={consensusMechanism}
                  onChange={setConsensusMechanism}
                />
              </Col>
            )}
            <Col span={24}>
              <ConsensusQuorumInput
                value={consensusQuorum}
                onChange={setConsensusQuorum}
              />
            </Col>
            <Col span={24} />
            <Col flex="auto">
              <Button
                type="text"
                onClick={() => history.push(`/${appId}/dao/${daoAddress}`)}
                size="large"
              >
                Cancel
              </Button>
            </Col>
            <Col>
              <Button
                onClick={newProposal}
                loading={loading}
                type="primary"
                size="large"
                disabled={disabled}
              >
                Add New Proposal
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}

export default ProposalInitialization
