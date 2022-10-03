import { useCallback, useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BN } from '@project-serum/anchor'
import { ConsensusMechanisms, ConsensusQuorums } from '@interdao/core'

import { Button, Card, Col, Divider, Input, Row, Space, Typography } from 'antd'
import ConsensusMechanismInput from './consensusMechanismInput'
import ConsensusQuorumInput from 'components/consensusQuorumInput'
import DurationInput from './durationInput'
import ProposalPreview from './proposalPreview'

import configs from 'configs'
import { ipfs } from 'helpers/ipfs'
import { AppState } from 'model'
import { clearTemplate } from 'model/template.controller'
import { useAnchorProvider } from 'hooks/useAnchorProvider'
import { useInitProposalIx } from 'hooks/instructions/useInitProposalIx'
import { useDaoData } from 'hooks/dao'
import { notifyError, notifySuccess } from 'helpers'
import { TemplateConfig } from 'templates'
import { APP_ROUTE } from 'configs/route'

const {
  sol: { taxman, fee },
  manifest: { appId },
} = configs

export type ProposalMetaData = {
  title: string
  description: string
  templateConfig: TemplateConfig<any>
  templateData?: any
}

const CURRENT_TIME = Number(new Date())
const ONE_DAY = 24 * 60 * 60 * 1000
const DEFAULT_DURATION = [CURRENT_TIME + ONE_DAY, CURRENT_TIME + 15 * ONE_DAY]
const DEFAULT_MECHANISM = ConsensusMechanisms.StakedTokenCounter

const ProposalInitialization = () => {
  const daos = useSelector((state: AppState) => state.daos)
  const { daoAddress, serializedTxs, templateData, templateConfig } =
    useSelector((state: AppState) => state.template)
  const daoData = useDaoData(daoAddress)

  const [mechanism, setMechanism] = useState(DEFAULT_MECHANISM)
  const [consensusQuorum, setConsensusQuorum] = useState(ConsensusQuorums.Half)
  const [duration, setDuration] = useState([...DEFAULT_DURATION])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  const history = useHistory()
  const dispatch = useDispatch()
  const provider = useAnchorProvider()
  const initProposalIx = useInitProposalIx()

  const disabled = !title || !description

  const proposalMetaData: ProposalMetaData = useMemo(() => {
    return {
      title,
      description,
      templateConfig: templateConfig!,
      templateData,
    }
  }, [description, templateData, templateConfig, title])

  const uploadMetaData = useCallback(async () => {
    const { digest } = await ipfs.methods.proposalMetaData.set(proposalMetaData)
    return digest
  }, [proposalMetaData])

  const newProposal = useCallback(async () => {
    const { authority } = daos[daoAddress]
    if (!serializedTxs.length) return

    try {
      setLoading(true)
      const digest = await uploadMetaData()
      const metadata = Buffer.from(digest)
      let listTxWithSigner: Parameters<typeof provider.sendAll>[0] = []

      const { proposalAddress, tx: txCreateProposal } =
        await window.interDao.initializeProposal({
          daoAddress,
          startDate: Math.floor(duration[0] / 1000),
          endDate: Math.floor(duration[1] / 1000),
          metadata,
          consensusMechanism: mechanism,
          consensusQuorum,
          feeOptions: {
            revenue: new BN(fee),
            revenuemanAddress: authority.toBase58(),
            tax: new BN(fee),
            taxmanAddress: taxman,
          },
          sendAndConfirm: false,
        })
      listTxWithSigner.push({ tx: txCreateProposal })

      for (const serializedTx of serializedTxs) {
        const txWithSigner = await initProposalIx({
          dao: daoAddress,
          proposal: proposalAddress,
          master: daoData?.master.toBase58()!,
          txBase64: serializedTx,
        })
        listTxWithSigner = listTxWithSigner.concat(txWithSigner)
      }
      const txIds = await provider.sendAll(listTxWithSigner)

      notifySuccess('Create a new proposal', txIds[0])
      dispatch(clearTemplate())
      return history.push(
        APP_ROUTE.proposalDetails.generatePath({ proposalAddress }),
      )
    } catch (er) {
      notifyError(er)
    } finally {
      return setLoading(false)
    }
  }, [
    daos,
    daoAddress,
    serializedTxs,
    uploadMetaData,
    provider,
    duration,
    mechanism,
    consensusQuorum,
    dispatch,
    history,
    initProposalIx,
    daoData?.master,
  ])

  useEffect(() => {
    if (!serializedTxs.length || !daoAddress) {
      return history.push(APP_ROUTE.listDaos.generatePath({}))
    }
  }, [daoAddress, history, serializedTxs, serializedTxs.length])

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
            <Col span={24}>
              <ConsensusMechanismInput
                value={mechanism}
                onChange={setMechanism}
              />
            </Col>
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
                onClick={() =>
                  history.push(APP_ROUTE.listDaos.generatePath({}))
                }
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
