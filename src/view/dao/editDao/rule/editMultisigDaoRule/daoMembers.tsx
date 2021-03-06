import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import isEqual from 'react-fast-compare'

import { Button, Col, Row, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import MemberInput from 'view/createDao/setRule/multisig/memberInput'

import { DAOMember } from 'model/createDao.controller'

type DAOMembersProps = {
  members: DAOMember[]
  setMember: (members: DAOMember[]) => void
}

const DAOMembers = ({ members, setMember }: DAOMembersProps) => {
  const [oldMember, setOldMember] = useState<string[]>([])

  const addMember = () => {
    const nextMembers = [...members]
    nextMembers.push({ name: '', walletAddress: '' })
    return setMember(nextMembers)
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
    return setMember(nextMembers)
  }

  const remove = (index: number) => {
    const nextMembers = [...members]
    nextMembers.splice(index, 1)
    return setMember(nextMembers)
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
                    disabledRemove={oldMember.includes(walletAddress)}
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
