import isEqual from 'react-fast-compare'

import { Button, Col, Row, Typography } from 'antd'

type PrivacyProps = {
  isPublic: boolean
  setIsPublic: (isPublic: boolean) => void
}

const Privacy = ({ isPublic, setIsPublic }: PrivacyProps) => {
  return (
    <Row gutter={[12, 12]}>
      <Col span={24}>
        <Typography.Text>DAO Privacy</Typography.Text>
      </Col>
      <Col>
        <Button
          onClick={() => setIsPublic(false)}
          className={isEqual(isPublic, false) ? '' : 'btn-unselect'}
          block
        >
          Member Only
        </Button>
      </Col>
      <Col>
        <Button
          onClick={() => setIsPublic(true)}
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
