import { ReactNode } from 'react'

import { Col, Row, Space, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

type RowSpaceBetweenProps = {
  label?: string
  value?: string | ReactNode
}
const RowSpaceBetween = ({ label = '', value = '' }: RowSpaceBetweenProps) => {
  return (
    <Row align="middle" gutter={[24, 24]}>
      <Col flex="auto">
        <Typography.Text type="secondary">{label}</Typography.Text>
      </Col>
      <Col>{value}</Col>
    </Row>
  )
}

export default RowSpaceBetween
