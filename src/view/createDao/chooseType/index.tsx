import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import {
  Button,
  Card,
  Col,
  Radio,
  RadioChangeEvent,
  Row,
  Typography,
} from 'antd'

import { AppDispatch } from 'model'
import { DaoType, submitStepChooseType } from 'model/createDao.controller'
import configs from 'configs'

const DAO_TYPE = [
  {
    key: 'flexible-dao',
    label: 'Flexible DAO',
    description:
      'The Flexible DAO has 3 regimes that allow you to create a DAO customized for your individual requirements, community structure, and governance token setup.',
  },
  {
    key: 'multisig-dao',
    label: 'MultiSig DAO (Coming Soon)',
    description:
      'The Multisig DAO allows you to create an organization for your team members with Autonomous regime and jointly own, manage shared assets such as treasury accounts, NFTs or mints.',
    disabled: true,
  },
]

const {
  manifest: { appId },
} = configs

const ChooseDaoType = () => {
  const [daoType, setDaoType] = useState<DaoType>('flexible-dao')
  const history = useHistory()
  const dispatch = useDispatch<AppDispatch>()

  const cardBorder = (key: string) =>
    daoType !== key ? { borderColor: 'transparent' } : {}

  return (
    <Row gutter={[32, 32]}>
      <Col span={24}>
        <Radio.Group
          defaultValue={daoType}
          onChange={(e: RadioChangeEvent) => setDaoType(e.target.value)}
          className="btn-radio-card"
        >
          <Row gutter={[24, 24]}>
            {DAO_TYPE.map(({ key, label, description, disabled }) => (
              <Col xs={24} md={12} key={key}>
                <Radio.Button
                  value={key}
                  style={{ border: 'none' }}
                  disabled={disabled}
                >
                  <Card
                    style={{ ...cardBorder(key) }}
                    className={`group-btn-card ${key} ${
                      daoType === key ? 'active' : ''
                    }`}
                    bordered={false}
                  >
                    <Row gutter={[12, 12]}>
                      <Col span={24}>
                        <Typography.Title level={4}>{label}</Typography.Title>
                      </Col>
                      <Col span={24}>
                        <Typography.Text type="secondary">
                          {description}
                        </Typography.Text>
                      </Col>
                    </Row>
                  </Card>
                </Radio.Button>
              </Col>
            ))}
          </Row>
        </Radio.Group>
      </Col>
      <Col span={24}>
        <Row>
          <Col flex="auto">
            <Button
              type="text"
              onClick={() => history.push(`/app/${appId}/dao`)}
              size="large"
            >
              Cancel
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={() => dispatch(submitStepChooseType({ daoType }))}
              size="large"
            >
              Continue
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default ChooseDaoType
