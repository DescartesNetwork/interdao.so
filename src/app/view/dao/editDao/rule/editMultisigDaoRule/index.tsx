import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'
import { CID } from 'ipfs-core'

import { Col, Row } from 'antd'
import Regime from '../../../../createDao/multisigDAO/daoRule/regime'
import ActionButton from '../../actionButton'
import DAOMembers from './daoMembers'

import { AppState } from 'app/model'
import { explorer } from 'shared/util'
import configs from 'app/configs'
import IPFS from 'shared/pdb/ipfs'
import MultisigWallet from 'app/helpers/mutisigWallet'
import usePDB from 'app/hooks/usePDB'

const {
  sol: { interDao },
} = configs

const EditMultisigDaoRule = ({ daoAddress }: { daoAddress: string }) => {
  const [loading, setLoading] = useState(false)
  const daos = useSelector((state: AppState) => state.daos.daos)
  const initMetadata = useSelector(
    (state: AppState) => state.metadata.initMetadata,
  )

  const { members } = initMetadata
  const pdb = usePDB()

  const disabled = useMemo(() => {
    for (const { walletAddress } of members) {
      if (!account.isAddress(walletAddress)) return true
    }
    return false
  }, [members])

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
    const { mint } = daos?.[daoAddress]
    const mintAddress = mint.toBase58()
    try {
      setLoading(true)
      const ipfs = new IPFS()
      const cid = await ipfs.set(initMetadata)
      const {
        multihash: { digest },
      } = CID.parse(cid)
      const daoMetaData = Buffer.from(digest)
      const { txId } = await interDao.updateDaoMetadata(daoMetaData, daoAddress)
      const multisigWallet = new MultisigWallet(mintAddress)

      for (const { walletAddress } of members) {
        const isValid = await validAccount(walletAddress, mintAddress)
        if (!isValid) continue
        await multisigWallet.mintToAccount(walletAddress, 1)
      }

      window.notify({
        type: 'success',
        description: 'Update members successfully. Click here to view details',
        onClick: () => window.open(explorer(txId), '_blank'),
      })

      const localMetadata = { ...initMetadata, cid } //update metadata for realtime
      return pdb.setItem(daoAddress, localMetadata)
    } catch (er: any) {
      window.notify({ type: 'error', description: er.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Row gutter={[32, 32]}>
      <Col span={24}>
        <Regime />
      </Col>
      <Col span={24}>
        <DAOMembers />
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
