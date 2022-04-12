import { useState } from 'react'

import { Col, Row, Typography } from 'antd'
import TransferSplPlugin from 'app/view/templates/spl/transfer'

import { ProposalReturnType } from 'app/view/templates/types'
import ApproveSplPlugin from 'app/view/templates/spl/approve'
import SwapAtrixPlugin from 'app/view/templates/atrix/swap'
import DepositAtrixPlugin from 'app/view/templates/atrix/deposit'
import WithdrawAtrixPlugin from 'app/view/templates/atrix/withdraw'
import StakeQuarryPlugin from 'app/view/templates/quarry/stake'
import UnstakeQuarryPlugin from 'app/view/templates/quarry/unstake'

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
      <Col xs={12} md={8}>
        <TransferSplPlugin
          daoAddress={daoAddress}
          onChange={onChange}
          selected={id}
          onClick={setId}
        />
      </Col>
      <Col xs={12} md={8}>
        <ApproveSplPlugin
          daoAddress={daoAddress}
          onChange={onChange}
          selected={id}
          onClick={setId}
        />
      </Col>
      <Col xs={12} md={8}>
        <SwapAtrixPlugin
          daoAddress={daoAddress}
          onChange={onChange}
          selected={id}
          onClick={setId}
        />
      </Col>
      <Col xs={12} md={8}>
        <DepositAtrixPlugin
          daoAddress={daoAddress}
          onChange={onChange}
          selected={id}
          onClick={setId}
        />
      </Col>
      <Col xs={12} md={8}>
        <WithdrawAtrixPlugin
          daoAddress={daoAddress}
          onChange={onChange}
          selected={id}
          onClick={setId}
        />
      </Col>
      <Col xs={12} md={8}>
        <StakeQuarryPlugin
          daoAddress={daoAddress}
          onChange={onChange}
          selected={id}
          onClick={setId}
        />
      </Col>
      <Col xs={12} md={8}>
        <UnstakeQuarryPlugin
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
