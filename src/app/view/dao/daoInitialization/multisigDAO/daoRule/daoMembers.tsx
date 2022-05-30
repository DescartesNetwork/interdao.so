import { ChangeEvent, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useWallet } from '@senhub/providers'
import isEqual from 'react-fast-compare'

import { Button, Col, Row, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import MemberInput from './memberInput'

import { AppDispatch, AppState } from 'app/model'
import { DAOMember, setInitMetadata } from 'app/model/metadata.controller'

const MY_INDEX = 0
const DAOMembers = () => {
  const {
    wallet: { address: myAddress },
  } = useWallet()
  const {
    metadata: { initMetadata },
  } = useSelector((state: AppState) => state)
  const dispatch = useDispatch<AppDispatch>()
  const { members } = initMetadata

  const setDefaultValue = useCallback(() => {
    if (members.length) return
    const DEFAULT_MEMBER = [{ name: '', walletAddress: myAddress }]
    return dispatch(setInitMetadata({ members: DEFAULT_MEMBER }))
  }, [dispatch, members.length, myAddress])

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

  const onChangeMyName = (e: ChangeEvent<HTMLInputElement>) => {
    const nextMembers = [...members]
    nextMembers[MY_INDEX] = { ...nextMembers[MY_INDEX], name: e.target.value }
    return dispatch(setInitMetadata({ members: nextMembers }))
  }

  const remove = (index: number) => {
    const nextMembers = [...members]
    nextMembers.splice(index, 1)
    return dispatch(setInitMetadata({ members: nextMembers }))
  }

  const test = () => {
    const members: DAOMember[] = [
      {
        name: 'tuan',
        walletAddress: '2vAEiACep3J1N2J6YY9gt4gAbbFEvuVdWgyu8KUkgzgn',
      },
      {
        name: 'tuan',
        walletAddress: '6JsMB6PRrgvb847ZDkPMkJaiab826GhyKfCkQxhWzVTd',
      },
      // {
      //   name: 'tuan',
      //   walletAddress: '2vAEiACep3J1N2J6YY9gt4gAbbFEvuVdWgyu8KUkgzgb',
      // },
      // {
      //   name: 'tuan',
      //   walletAddress: '2vAEiACep3J1N2J6YY9gt4gAbbFEvuVdWgyu8KUkgzgc',
      // },
      // {
      //   name: 'tuan',
      //   walletAddress: '2vAEiACep3J1N2J6YY9gt4gAbbFEvuVdWgyu8KUkgzgd',
      // },
      // {
      //   name: 'tuan',
      //   walletAddress: '2vAEiACep3J1N2J6YY9gt4gAbbFEvuVdWgyu8KUkgzge',
      // },
      // {
      //   name: 'tuan',
      //   walletAddress: '2vAEiACep3J1N2J6YY9gt4gAbbFEvuVdWgyu8KUkgzgf',
      // },
      // {
      //   name: 'tuan',
      //   walletAddress: '2vAEiACep3J1N2J6YY9gt4gAbbFEvuVdWgyu8KUkgzgi',
      // },
      // {
      //   name: 'tuan',
      //   walletAddress: '2vAEiACep3J1N2J6YY9gt4gAbbFEvuVdWgyu8KUkgzgo',
      // },
      // {
      //   name: 'tuan',
      //   walletAddress: '2vAEiACep3J1N2J6YY9gt4gAbbFEvuVdWgyu8KUkgzgz',
      // },
      // {
      //   name: 'tuan',
      //   walletAddress: '2vAEiACep3J1N2J6YY9gt4gAbbFEvuVdWgyu8KUkgzgx',
      // },
      // {
      //   name: 'tuan',
      //   walletAddress: '2vAEiACep3J1N2J6YY9gt4gAbbFEvuVdWgyu8KUkgzgv',
      // },
      // {
      //   name: 'tuan',
      //   walletAddress: '2vAEiACep3J1N2J6YY9gt4gAbbFEvuVdWgyu8KUkgzgt',
      // },
    ]
    return dispatch(setInitMetadata({ members }))
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
          <Button onClick={test}>Test</Button>
        </Row>
      </Col>
    </Row>
  )
}

export default DAOMembers
