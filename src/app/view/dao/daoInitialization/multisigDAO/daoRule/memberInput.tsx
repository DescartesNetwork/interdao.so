import { Button, Col, Input, Row } from 'antd'
import { ChangeEvent } from 'react'
import IonIcon from 'shared/antd/ionicon'

export type DAOMember = {
  name: string
  walletAddress: string
}

type MemberInputProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void
  disabledBtn?: boolean
  disabledWalletInput?: boolean
} & DAOMember

const MemberInput = ({
  name = '',
  walletAddress = '',
  onChange,
  disabledBtn = false,
  disabledWalletInput = false,
}: MemberInputProps) => {
  return (
    <Row gutter={[12, 12]}>
      <Col span={4}>
        <Input
          className="border-less"
          onChange={() => onChange}
          value={name}
          placeholder="Name"
          name="name"
        />
      </Col>
      <Col span={18}>
        <Input
          className="border-less"
          value={walletAddress}
          placeholder="Input wallet address"
          onChange={(e) => onChange}
          disabled={disabledWalletInput}
          name="walletAddress"
        />
      </Col>
      <Col span={2}>
        <Button
          disabled={disabledBtn}
          type="text"
          icon={<IonIcon name="trash-outline" />}
        />
      </Col>
    </Row>
  )
}

export default MemberInput
