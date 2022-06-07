import { ChangeEvent, useCallback, useEffect } from 'react'
import { useWallet } from '@senhub/providers'
import isEqual from 'react-fast-compare'

import { Button, Col, Row, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import MemberInput from './memberInput'

import { DAOMember } from 'app/model/metadata.controller'

const MY_INDEX = 0
type DAOMembersProps = {
  members: DAOMember[]
  setMember: (members: DAOMember[]) => void
}
const DAOMembers = ({ members, setMember }: DAOMembersProps) => {
  const {
    wallet: { address: myAddress },
  } = useWallet()

  const setDefaultValue = useCallback(() => {
    if (members.length) return
    const DEFAULT_MEMBER = [{ name: '', walletAddress: myAddress }]
    return setMember(DEFAULT_MEMBER)
  }, [members.length, myAddress, setMember])

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

  const onChangeMyName = (e: ChangeEvent<HTMLInputElement>) => {
    const nextMembers = [...members]
    nextMembers[MY_INDEX] = { ...nextMembers[MY_INDEX], name: e.target.value }
    return setMember(nextMembers)
  }

  const remove = (index: number) => {
    const nextMembers = [...members]
    nextMembers.splice(index, 1)
    return setMember(nextMembers)
  }

  useEffect(() => {
    setDefaultValue()
  }, [setDefaultValue])

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
            {members.length && (
              <MemberInput
                name={members[MY_INDEX].name}
                walletAddress={myAddress}
                onChange={onChangeMyName}
                disabledBtn={true}
                disabledWalletInput={true}
              />
            )}
          </Col>
          {members.length &&
            members.map(({ name, walletAddress }, idx) => {
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
