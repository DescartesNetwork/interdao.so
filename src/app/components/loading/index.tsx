import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { Row, Col, Spin, Typography, Space } from 'antd'
import { AppState } from 'app/model'

import './index.less'

const Loading = () => {
  const loading = useSelector((state: AppState) => state.loading)

  const loadingElement = useMemo(() => {
    return Object.values(loading).find((e) => e.loading === true)
  }, [loading])

  if (!loadingElement?.message) return null
  return (
    <div className="loading-screen" style={{ display: 'block' }}>
      <Row gutter={[24, 24]}>
        <Col span={24} style={{ height: 256 }} />
        <Col span={24}>
          <Row gutter={[24, 24]} justify="center">
            <Col>
              <Space direction="vertical" align="center" size={32}>
                <Spin size="large" />
                <Typography.Title level={5}>
                  {loadingElement?.message}
                </Typography.Title>
              </Space>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default Loading
