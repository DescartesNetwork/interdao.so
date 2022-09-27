import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { DaoRegimes } from '@interdao/core'
import { util } from '@sentre/senhub'

import { Col, Row } from 'antd'
import ActionButton from '../../actionButton'
import DAOMembers from './daoMembers'
import Regime from 'view/createDao/setRule/multisig/regime'

import { AppState } from 'model'
import MultisigWallet from 'helpers/mutisigWallet'
import { DAOMember, MetaData } from 'model/createDao.controller'
import useMetaData from 'hooks/useMetaData'
import { ipfs } from 'helpers/ipfs'
import { notifyError } from 'helpers'

const EditMultisigDaoRule = ({ daoAddress }: { daoAddress: string }) => {
  const [loading, setLoading] = useState(false)
  const { metaData } = useMetaData(daoAddress)
  const [nextMetadata, setNextMetadata] = useState<MetaData>()
  const daos = useSelector((state: AppState) => state.daos)

  const disabled = useMemo(() => {
    if (!nextMetadata) return true
    for (const { walletAddress } of nextMetadata.members) {
      if (!util.isAddress(walletAddress)) return true
    }
    return false
  }, [nextMetadata])

  const validAccount = async (walletAddress: string, mintAddress: string) => {
    try {
      const { splt } = window.sentre
      const associatedAddress = await splt.deriveAssociatedAddress(
        walletAddress,
        mintAddress,
      )
      const data = await splt.getAccountData(associatedAddress)
      if (data) return false
    } catch (error) {
      return true
    }
  }

  const updateMember = async () => {
    if (!nextMetadata) return
    const { mint } = daos?.[daoAddress]
    const mintAddress = mint.toBase58()
    try {
      setLoading(true)
      const { digest } = await ipfs.methods.daoMetadata.set(nextMetadata)
      const daoMetaData = Buffer.from(digest)
      const { txId } = await window.interDao.updateDaoMetadata(
        daoMetaData,
        daoAddress,
      )
      const multisigWallet = new MultisigWallet(mintAddress)

      for (const { walletAddress } of nextMetadata.members) {
        const isValid = await validAccount(walletAddress, mintAddress)
        if (!isValid) continue
        await multisigWallet.mintToAccount(walletAddress, 1)
      }

      window.notify({
        type: 'success',
        description: 'Update members successfully. Click here to view details',
        onClick: () => window.open(util.explorer(txId), '_blank'),
      })
    } catch (er: any) {
      notifyError(er)
    } finally {
      setLoading(false)
    }
  }

  const onChangeMember = (members: DAOMember[]) => {
    if (!nextMetadata) return
    setNextMetadata({ ...nextMetadata, members })
  }

  useEffect(() => {
    if (!nextMetadata && metaData) setNextMetadata(metaData)
  }, [metaData, nextMetadata])

  return (
    <Row gutter={[32, 32]}>
      <Col span={24}>
        <Regime regime={DaoRegimes.Autonomous} />
      </Col>
      <Col span={24}>
        <DAOMembers
          members={nextMetadata?.members || []}
          setMember={onChangeMember}
        />
      </Col>
      <Col span={24}>
        <ActionButton
          loading={loading}
          onSave={updateMember}
          daoAddress={daoAddress}
          disabled={disabled}
        />
      </Col>
    </Row>
  )
}

export default EditMultisigDaoRule
