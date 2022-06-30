import { ChangeEvent } from 'react'
import { useWallet } from '@sentre/senhub'
import isEqual from 'react-fast-compare'

import { Button, Col, Row, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import MemberInput from './memberInput'

import { DAOMember } from 'model/createDao.controller'

type DAOMembersProps = {
  members: DAOMember[]
  setMember: (members: DAOMember[]) => void
}

const DAOMembers = ({ members, setMember }: DAOMembersProps) => {
  const {
    wallet: { address: myAddress },
  } = useWallet()

  const onAddNew = () => {
    const nextMembers = [...members]
    nextMembers.push({ name: '', walletAddress: '' })
    return setMember(nextMembers)
  }

  const onRemove = (index: number) => {
    const nextMembers = [...members]
    nextMembers.splice(index, 1)
    return setMember(nextMembers)
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    // Valid input value
    for (const { walletAddress } of members) {
      if (isEqual(walletAddress, e.target.value))
        return window.notify({
          type: 'warning',
          description: 'This wallet address already exists',
        })
    }
    // Update member data
    const nextMembers = [...members]
    nextMembers[index] = {
      ...nextMembers[index],
      [e.target.name]: e.target.value,
    }
    return setMember(nextMembers)
  }

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Typography.Title level={4}>
          People who'll be part of your team.
        </Typography.Title>
      </Col>
      <Col span={24}>
        <Row gutter={[12, 12]}>
          {members.map(({ name, walletAddress }, idx) => {
            const disabled = walletAddress === myAddress
            return (
              <Col span={24} key={idx}>
                <MemberInput
                  name={name}
                  walletAddress={walletAddress}
                  onChange={(e) => onChange(e, idx)}
                  remove={() => onRemove(idx)}
                  disabledRemove={disabled}
                  disabledWalletInput={disabled}
                />
              </Col>
            )
          })}
          <Col span={4}>
            <Button
              block
              type="dashed"
              icon={<IonIcon name="add-outline" />}
              onClick={onAddNew}
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
