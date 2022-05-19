import { useDispatch, useSelector } from 'react-redux'

import { Card, Col, Radio, RadioChangeEvent, Row, Typography } from 'antd'

import { AppDispatch, AppState } from 'app/model'
import { setCreateDaoType } from 'app/model/dao.controller'
import { setCreateDaoMetaData } from 'app/model/metadata.controller'

const DAO_TYPE = [
  {
    key: 'flexible-dao',
    label: 'Flexible DAO',
    description:
      'The Flexible DAO has 3 regimes that allow you to create a DAO customized for your individual requirements, community structure, and governance token setup.',
    state: 1,
  },
  {
    key: 'multisig-dao',
    label: 'MultiSig DAO',
    description:
      'The Multisig DAO allows you to create an organization for your team members with Autonomous regime and jointly own, manage shared assets such as treasury accounts, NFTs or mints.',
    state: 0,
  },
]

const ChooseDaoType = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {
    dao: { daoType },
  } = useSelector((state: AppState) => state)

  const cardBorder = (key: string) =>
    daoType !== key ? { borderColor: 'transparent' } : {}

  const selectDaoType = async (e: RadioChangeEvent) => {
    const daoType = e.target.value
    await dispatch(setCreateDaoType(daoType))
    dispatch(setCreateDaoMetaData({ daoType }))
  }

  return (
    <Row>
      <Col span={24}>
        <Radio.Group
          defaultValue={daoType}
          onChange={selectDaoType}
          className="btn-radio-card"
        >
          <Row gutter={[24, 24]}>
            {DAO_TYPE.map(({ key, label, description, state }) => (
              <Col xs={24} md={12} key={key}>
                <Radio.Button value={key} style={{ border: 'none' }}>
                  <Card
                    style={{ ...cardBorder(key) }}
                    className={`group-btn-card ${key} ${
                      daoType === key ? 'active' : ''
                    }`}
                    bordered={false}
                  >
                    <Row gutter={[12, 12]}>
                      <Col span={24}>
                        <Row>
                          <Col flex="auto">
                            <Typography.Title level={4}>
                              {label}
                            </Typography.Title>
                          </Col>
                        </Row>
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
    </Row>
  )
}

export default ChooseDaoType
