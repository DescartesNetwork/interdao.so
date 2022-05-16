import { useUI } from '@senhub/providers'
import isEqual from 'react-fast-compare'

import { Button, Col, Row } from 'antd'

export enum DAOPrivacy {
  Member = 'member',
  Public = 'public',
}

type PrivacyDAOProps = {
  value: DAOPrivacy
  onChange: (value: DAOPrivacy) => void
}

const PrivacyDAO = ({
  value = DAOPrivacy.Member,
  onChange = () => {},
}: PrivacyDAOProps) => {
  const {
    ui: { infix },
  } = useUI()
  const mobileScreen = infix === 'xs'
  const mobileSpan = mobileScreen ? 8 : undefined

  return (
    <Row gutter={[12, 12]}>
      <Col span={24}>DAO privacy</Col>
      <Col span={mobileSpan}>
        <Button
          className={isEqual(value, DAOPrivacy.Member) ? '' : 'btn-unselect'}
          onClick={() => onChange(DAOPrivacy.Member)}
          block
        >
          Member
        </Button>
      </Col>
      <Col span={mobileSpan}>
        <Button
          className={isEqual(value, DAOPrivacy.Public) ? '' : 'btn-unselect'}
          onClick={() => onChange(DAOPrivacy.Public)}
          block
        >
          Public
        </Button>
      </Col>
    </Row>
  )
}

export default PrivacyDAO
