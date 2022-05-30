import { useUI } from '@senhub/providers'
import isEqual from 'react-fast-compare'

import { Button, Col, Row, Typography } from 'antd'

export type PrivacyProps = {
  isPublic: boolean
  onChange: (value: boolean) => void
}

const Privacy = ({ isPublic = false, onChange }: PrivacyProps) => {
  const {
    ui: { infix },
  } = useUI()
  const mobileScreen = infix === 'xs'
  const mobileSpan = mobileScreen ? 8 : undefined
  return (
    <Row gutter={[12, 12]}>
      <Col span={24}>
        <Typography.Text>DAO privacy</Typography.Text>
      </Col>
      <Col span={mobileSpan}>
        <Button
          onClick={() => onChange(false)}
          className={isEqual(isPublic, false) ? '' : 'btn-unselect'}
          block
        >
          Member
        </Button>
      </Col>
      <Col span={mobileSpan}>
        <Button
          onClick={() => onChange(true)}
          className={isEqual(isPublic, true) ? '' : 'btn-unselect'}
          block
        >
          Public
        </Button>
      </Col>
    </Row>
  )
}

export default Privacy
