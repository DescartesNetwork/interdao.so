import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import isEqual from 'react-fast-compare'

import { Button, Col, Row, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import MemberInput from 'app/view/dao/daoInitialization/multisigDAO/daoRule/memberInput'

import { AppDispatch, AppState } from 'app/model'
import { setInitMetadata } from 'app/model/metadata.controller'

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

export default DAOMembers
