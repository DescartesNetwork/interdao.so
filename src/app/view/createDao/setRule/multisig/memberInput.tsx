import { ChangeEvent } from 'react'

import { Button, Col, Input, Row } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import { DAOMember } from 'app/model/createDao.controller'

type MemberInputProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  disabledRemove?: boolean
  disabledWalletInput?: boolean
  disabledName?: boolean
  remove?: () => void
} & DAOMember

const MemberInput = ({
  name = '',
  walletAddress = '',
  onChange,
  disabledRemove: disabledBtn = false,
  disabledWalletInput = false,
  disabledName = false,
  remove = () => {},
}: MemberInputProps) => {
  return (
    <Row gutter={[12, 12]}>
      <Col span={4}>
        <Input
          className="border-less"
          onChange={onChange}
          value={name}
          placeholder="Name"
          name="name"
          disabled={disabledName}
        />
      </Col>
      <Col span={18}>
        <Input
          className="border-less"
          value={walletAddress}
          placeholder="Input wallet address"
          disabled={disabledWalletInput}
          name="walletAddress"
          onChange={onChange}
        />
      </Col>
      <Col span={2}>
        <Button
          disabled={disabledBtn}
          type="text"
          icon={<IonIcon name="trash-outline" />}
          onClick={remove}
        />
      </Col>
    </Row>
  )
}

export default MemberInput
