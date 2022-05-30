import { useCallback, useEffect, useMemo, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  ConsensusMechanisms,
  ConsensusQuorums,
  FeeOptions,
} from '@interdao/core'
import BN from 'bn.js'
import { CID } from 'ipfs-core'

import { Button, Card, Col, Divider, Input, Row, Space, Typography } from 'antd'
import ConsensusMechanismInput from './consensusMechanismInput'
import ConsensusQuorumInput from '../../../components/consensusQuorumInput'
import DurationInput from './durationInput'
import ProposalPreview from './proposalPreview'

import configs from 'app/configs'
import { explorer } from 'shared/util'
import IPFS from 'shared/pdb/ipfs'
import { AppState } from 'app/model'
import { clearTx } from 'app/model/template.controller'
import useMetaData from 'app/hooks/useMetaData'

const {
  sol: { interDao, taxman, fee },
  manifest: { appId },
} = configs

export type ProposalMetaData = {
  title: string
  description: string
  templateName: string
}

const CURRENT_TIME = Number(new Date())
const ONE_DAY = 24 * 60 * 60 * 1000

const ProposalInitialization = () => {
  const [consensusMechanism, setConsensusMechanism] = useState(
    ConsensusMechanisms.StakedTokenCounter,
  )
  const [consensusQuorum, setConsensusQuorum] = useState(ConsensusQuorums.Half)
  const [duration, setDuration] = useState([
    CURRENT_TIME + ONE_DAY,
    CURRENT_TIME + 15 * ONE_DAY,
  ])
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const { daoAddress } = useParams<{ daoAddress: string }>()
  const {
    template: { tx, templateName },
    dao: { daos },
  } = useSelector((state: AppState) => state)
  const history = useHistory()
  const dispatch = useDispatch()
  const daoMetaData = useMetaData(daoAddress)

  const disabled = !title || !description
  const isMultisigDAO = daoMetaData?.daoType === 'multisig-dao'

  const proposalMetaData: ProposalMetaData = useMemo(() => {
    return {
      title,
      description,
      templateName,
    }
  }, [description, templateName, title])

  const newProposal = useCallback(async () => {
    const { authority } = daos[daoAddress]
    if (!tx) return

    try {
      setLoading(true)

      const ipfs = new IPFS()
      const cid = await ipfs.set(proposalMetaData)
      const {
        multihash: { digest },
      } = CID.parse(cid)

      const feeOption: Partial<FeeOptions> = {
        revenue: new BN(fee),
        revenuemanAddress: authority.toBase58(),
        tax: new BN(fee),
        taxmanAddress: taxman,
      }

      const { programId, data, accounts } = tx

      const metadata = Buffer.from(digest)
      const valueAccounts = Object.values(accounts)
      console.log('valueAccounts: ', valueAccounts)
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
        feeOption,
      )
      window.notify({
        type: 'success',
        description:
          'Create a new proposal successfully. Click here to view details.',
        onClick: () => window.open(explorer(txId), '_blank'),
      })

      //Clear tx in redux
      dispatch(clearTx())

      return history.push(
        `/app/${appId}/dao/${daoAddress}/proposal/${proposalAddress}`,
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
    daos,
    daoAddress,
    proposalMetaData,
    tx,
    duration,
    consensusMechanism,
    consensusQuorum,
    dispatch,
    history,
  ])

  useEffect(() => {
    if (!tx) return history.push(`/app/${appId}/dao/${daoAddress}`)
  }, [daoAddress, history, tx])

  return (
    <Row gutter={[24, 24]} justify="center">
      <Col xs={24} md={14}>
        <Card bordered={false}>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Typography.Title level={1}>
                Input proposal information
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
                onClick={() => history.push(`/app/${appId}/dao/${daoAddress}`)}
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
                Add a new Proposal
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}

export default ProposalInitialization
