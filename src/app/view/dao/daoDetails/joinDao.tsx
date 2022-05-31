import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAccount, useWallet } from '@senhub/providers'

import { Button, Col, Image, Modal, Row, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'

import { DaoDetailsProps } from './index'
import useMetaData from 'app/hooks/useMetaData'
import Distributor from 'app/helpers/distributor'
import { explorer } from 'shared/util'

import BG_JOIN_DAO from 'app/static/images/system/bg-join-dao.png'

const JoinDao = ({ daoAddress }: DaoDetailsProps) => {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const {
    wallet: { address: walletAddress },
  } = useWallet()
  const metaData = useMetaData(daoAddress)
  const { accounts } = useAccount()

  const listMint = useMemo(() => {
    const mints = []
    for (const accountAddr in accounts) {
      mints.push(accounts[accountAddr].mint)
    }
    return mints
  }, [accounts])

  const isValidAccount = useCallback(async () => {
    try {
      if (!metaData || !metaData.distributorAddress) return setVisible(false)
      const { distributorAddress, members } = metaData
      const distributor = new Distributor()
      const mintAddress = await distributor.getMintAddress(distributorAddress)
      const membersAddress = members.map((member) => member.walletAddress)

      if (
        membersAddress.includes(walletAddress) &&
        !listMint.includes(mintAddress)
      )
        return setVisible(true)

      const recipientData = await distributor.getRecipientData(
        walletAddress,
        distributorAddress,
      )
      if (!recipientData) return setVisible(false) // not in list

      const receiptData = await distributor.getReceiptData(
        recipientData,
        distributorAddress,
      )
      if (receiptData) return setVisible(false) // claimed
      return setVisible(false)
    } catch (error) {
      return setVisible(true) // Not claim
    }
  }, [listMint, metaData, walletAddress])

  const onClaim = async () => {
    if (!metaData || !metaData.distributorAddress) return
    const { distributorAddress } = metaData
    try {
      setLoading(true)
      const distributor = new Distributor()
      const recipientData = await distributor.getRecipientData(
        walletAddress,
        distributorAddress,
      )
      if (!recipientData) return

      const txId = await distributor.claimToken(
        recipientData,
        distributorAddress,
      )
      return window.notify({
        type: 'success',
        description: 'Join the DAO successfully. Click here to view details.',
        onClick: () => window.open(explorer(txId), '_blank'),
      })
    } catch (er: any) {
      return window.notify({
        type: 'success',
        description: er.message,
      })
    } finally {
      setLoading(false)
      setVisible(false)
    }
  }

  useEffect(() => {
    isValidAccount()
  }, [isValidAccount])

  return (
    <Modal
      visible={visible}
      onCancel={() => setVisible(false)}
      closeIcon={<IonIcon name="close-outline" />}
      footer={null}
      // bodyStyle={{ background: `url(${BG_JOIN_DAO})` }}
      className="join-dao"
    >
      <Image src={BG_JOIN_DAO} preview={false} className="join-dao-bg" />
      <Row className="interdao-banner" gutter={[32, 32]}>
        <Col span={24}>
          <Typography.Title level={4}>Join DAO</Typography.Title>
        </Col>
        <Col span={24}>
          <Typography.Title level={5}>
            Welcome to our DAO. Click here to join and vote with us!
          </Typography.Title>
        </Col>
        <Col span={24}>
          <Button loading={loading} onClick={onClaim} type="primary">
            Join
          </Button>
        </Col>
      </Row>
    </Modal>
  )
}

export default JoinDao
