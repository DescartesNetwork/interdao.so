import { useState } from 'react'

import { Col, Row, Typography } from 'antd'
import TransferSplPlugin from 'app/view/templates/spl/transfer'

import { ProposalReturnType } from 'app/view/templates/types'

export type TemplateInputProps = {
  daoAddress: string
  onChange?: (value: ProposalReturnType | undefined) => void
}

const TemplateInput = ({
  daoAddress,
  onChange = () => {},
}: TemplateInputProps) => {
  const [id, setId] = useState('')
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Typography.Text>Templates</Typography.Text>
      </Col>
      <Col span={12}>
        <TransferSplPlugin
          daoAddress={daoAddress}
          onChange={onChange}
          selected={id}
          onClick={setId}
        />
      </Col>
    </Row>
  )
}

export default TemplateInput
