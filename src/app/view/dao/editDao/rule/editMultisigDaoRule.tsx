import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'
import { CID } from 'ipfs-core'
import isEqual from 'react-fast-compare'

import { Button, Col, Row, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import MemberInput from '../../daoInitialization/multisigDAO/daoRule/memberInput'
import Regime from '../../daoInitialization/multisigDAO/daoRule/regime'
import ActionButton from '../actionButton'

import { AppDispatch, AppState } from 'app/model'
import { setInitMetadata } from 'app/model/metadata.controller'
import { explorer } from 'shared/util'
import configs from 'app/configs'
import IPFS from 'shared/pdb/ipfs'
import MultisigWallet from 'app/helpers/mutisigWallet'

const {
  sol: { interDao },
} = configs

const DAOMembers = () => {
  const [oldMember, setOldMember] = useState<string[]>([])
  const {
    metadata: { initMetadata },
  } = useSelector((state: AppState) => state)
  const dispatch = useDispatch<AppDispatch>()
  const { members } = initMetadata

  const addMember = () => {
    const nextMembers = [...members]
    nextMembers.push({ name: '', walletAddress: '' })
    return dispatch(setInitMetadata({ members: nextMembers }))
  }

  const onChangeMember = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const nextMembers = [...members]
    for (const { walletAddress } of members) {
      if (isEqual(walletAddress, e.target.value))
        return window.notify({
          type: 'warning',
          description: 'This wallet address already exists',
        })
    }
    nextMembers[index] = {
      ...nextMembers[index],
      [e.target.name]: e.target.value,
    }
    return dispatch(setInitMetadata({ members: nextMembers }))
  }

  const remove = (index: number) => {
    const nextMembers = [...members]
    nextMembers.splice(index, 1)
    return dispatch(setInitMetadata({ members: nextMembers }))
  }

  const setDefaultMembers = useCallback(() => {
    if (oldMember.length) return
    const oldAddresses = []
    for (const { walletAddress } of members) {
      oldAddresses.push(walletAddress)
    }
    return setOldMember(oldAddresses)
  }, [members, oldMember])

  useEffect(() => {
    setDefaultMembers()
  }, [setDefaultMembers])

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Typography.Title level={4}>
          People who'll be part of your team.
        </Typography.Title>
      </Col>
      <Col span={24}>
        <Row gutter={[12, 12]}>
          {members.length &&
            members.map(({ name, walletAddress }, idx) => {
              return (
                <Col span={24} key={idx}>
                  <MemberInput
                    name={name}
                    walletAddress={walletAddress}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      onChangeMember(e, idx)
                    }
                    remove={() => remove(idx)}
                    disabledBtn={oldMember.includes(walletAddress)}
                    disabledWalletInput={oldMember.includes(walletAddress)}
                    disabledName={oldMember.includes(walletAddress)}
                  />
                </Col>
              )
            })}
          <Col span={4}>
            <Button
              block
              type="dashed"
              icon={<IonIcon name="add-outline" />}
              onClick={addMember}
            >
              Add
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

const EditMultisigDaoRule = ({ daoAddress }: { daoAddress: string }) => {
  const [loading, setLoading] = useState(false)
  const {
    dao: { daos: daoData },
    metadata: { initMetadata },
  } = useSelector((state: AppState) => state)
  const { members } = initMetadata

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
    const { mint } = daoData?.[daoAddress]
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
        const walletPubkey = account.fromAddress(walletAddress)
        await multisigWallet.mintToAccount(walletPubkey)
      }

      return window.notify({
        type: 'success',
        description:
          'Update information successfully. Click here to view details',
        onClick: () => window.open(explorer(txId), '_blank'),
      })
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
