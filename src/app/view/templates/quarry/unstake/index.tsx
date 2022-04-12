import { useCallback, useState } from 'react'

import { Card, Col, Row, Typography } from 'antd'

import { ProposalReturnType } from 'app/view/templates/types'

export const NAME = 'quarry/unstake'

export type UnstakeQuarryPluginProps = {
  daoAddress: string
  selected?: string
  onChange?: (value: ProposalReturnType | undefined) => void
  onClick?: (value: string) => void
}

const UnstakeQuarryPlugin = ({
  daoAddress = '',
  selected = '',
  onChange = () => {},
  onClick = () => {},
}: UnstakeQuarryPluginProps) => {
  const [visible, setVisible] = useState(false)
  console.log(visible)

  const _onClick = useCallback(() => {
    onClick(NAME)
    return setVisible(true)
  }, [onClick])

  return (
    <Card
      onClick={_onClick}
      style={{ cursor: 'pointer' }}
      bordered={selected === NAME}
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Typography.Title level={5} type="secondary">
            Quarry/Unstake
          </Typography.Title>
        </Col>
        <Col span={24}>
          <Typography.Text type="secondary">Comming Soon</Typography.Text>
        </Col>
      </Row>
    </Card>
  )
}

export default UnstakeQuarryPlugin
