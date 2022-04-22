import { useCallback, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { ConsensusMechanisms, ConsensusQuorums } from '@interdao/core'
import BN from 'bn.js'
import { CID } from 'ipfs-core'

import { Button, Card, Col, Row, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import ConsensusMechanismInput from './consensusMechanismInput'
import ConsensusQuorumInput from './consensusQuorumInput'
import DurationInput from './durationInput'
import ProposalPreview from './proposalPreview'
import TemplateInput from './templateInput'

import configs from 'app/configs'
import { ProposalReturnType } from 'app/view/templates/types'
import { explorer } from 'shared/util'
import IPFS from 'shared/pdb/ipfs'

const {
  manifest: { appId },
} = configs
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
  const [tx, setTx] = useState<ProposalReturnType | undefined>()
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const { daoAddress } = useParams<{ daoAddress: string }>()

  const newProposal = useCallback(async () => {
    try {
      setLoading(true)

      const ipfs = new IPFS()
      const cid = await ipfs.set({ data: 'Tuan le Test' })
      const {
        multihash: { digest },
      } = CID.parse(cid)

      const {
        sol: { interDao, fee, taxman },
      } = configs
      if (!tx) return
      const {
        programId,
        data,
        accounts: { src, dst, payer },
      } = tx
      const metadata = Buffer.from(digest) // Replace the real hash here
      const accounts = [src, dst, payer]
      const { txId, proposalAddress } = await interDao.initializeProposal(
        daoAddress,
        programId.toBase58(),
        data,
        accounts.map(({ pubkey }) => pubkey),
        accounts.map(({ isSigner }) => isSigner),
        accounts.map(({ isWritable }) => isWritable),
        accounts.map(({ isMaster }) => isMaster),
        Math.floor(duration[0] / 1000),
        Math.floor(duration[1] / 1000),
        new BN(fee),
        taxman,
        metadata,
        consensusMechanism,
        consensusQuorum,
      )
      window.notify({
        type: 'success',
        description:
          'Create a new proposal successfully. Click here to view details.',
        onClick: () => window.open(explorer(txId), '_blank'),
      })
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
  }, [daoAddress, consensusMechanism, consensusQuorum, duration, tx, history])

  return (
    <Row gutter={[24, 24]} justify="center">
      <Col xs={24} md={16}>
        <Card bordered={false}>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Typography.Title level={3}>
                New Proposal Information
              </Typography.Title>
            </Col>
            <Col span={24} />
            <Col span={24}>
              <ProposalPreview daoAddress={daoAddress} />
            </Col>
            <Col span={24}>
              <DurationInput value={duration} onChange={setDuration} />
            </Col>
            <Col span={24}>
              <ConsensusMechanismInput
                value={consensusMechanism}
                onChange={setConsensusMechanism}
              />
            </Col>
            <Col span={24}>
              <ConsensusQuorumInput
                value={consensusQuorum}
                onChange={setConsensusQuorum}
              />
            </Col>
            <Col span={24}>
              <TemplateInput daoAddress={daoAddress} onChange={setTx} />
            </Col>
            <Col span={24} />
            <Col flex="auto">
              <Button
                type="text"
                icon={<IonIcon name="trash-outline" />}
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
                icon={<IonIcon name="add-outline" />}
              >
                Create the Proposal
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}

export default ProposalInitialization
