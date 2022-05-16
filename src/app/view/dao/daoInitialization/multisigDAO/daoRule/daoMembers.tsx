import { ChangeEvent, useState } from 'react'
import { useWallet } from '@senhub/providers'

import { Button, Col, Row, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import MemberInput, { DAOMember } from './memberInput'

const MY_INDEX = 0
const DAOMembers = () => {
  const {
    wallet: { address: myAddress },
  } = useWallet()
  const [members, setMembers] = useState<DAOMember[]>([
    { name: '', walletAddress: myAddress },
  ])

  const addMember = () => {
    const nextMembers = [...members]
    nextMembers.push({ name: '', walletAddress: '' })
    setMembers(nextMembers)
  }

  const onChangeMember = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const nextMembers = [...members]
    nextMembers[index] = {
      ...nextMembers[index],
      [e.target.name]: e.target.value,
    }
    setMembers(nextMembers)
  }

  const onChangeMyName = (e: ChangeEvent<HTMLInputElement>) => {
    const nextMembers = [...members]
    nextMembers[MY_INDEX] = { ...nextMembers[MY_INDEX], name: e.target.value }
    setMembers(nextMembers)
  }

  const remove = (index: number) => {
    const nextMembers = [...members]
    nextMembers.splice(index, 1)
    setMembers(nextMembers)
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
          <Col span={24} key={myAddress}>
            <MemberInput
              name={members[0].name}
              walletAddress={myAddress}
              onChange={onChangeMyName}
              disabledBtn={true}
              disabledWalletInput={true}
            />
          </Col>
          {members.map(({ name, walletAddress }, idx) => {
            if (walletAddress === myAddress) return null
            return (
              <Col span={24} key={idx}>
                <MemberInput
                  name={name}
                  walletAddress={walletAddress}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    onChangeMember(e, idx)
                  }
                  remove={() => remove(idx)}
                />
              </Col>
            )
          })}
          <Col span={4}>
            <Button
              style={{ width: '100%' }}
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
