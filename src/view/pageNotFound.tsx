import { useHistory } from 'react-router-dom'

import { Col, Row, Typography, Button, Image, Card } from 'antd'

import BG_NOT_FOUND from 'static/images/system/not-found.png'
import { APP_ROUTE } from 'configs/route'

const PageNotFound = () => {
  const history = useHistory()

  return (
    <Row justify="center">
      <Col span={24} style={{ height: 156 }} />
      <Col xs={24} md={12} xl={10}>
        <Card className="page-not-found" bodyStyle={{ padding: '72px 48px' }}>
          <Image preview={false} src={BG_NOT_FOUND} />
          <Row
            gutter={[16, 16]}
            justify="center"
            style={{ textAlign: 'center' }}
          >
            <Col span={24}>
              <Typography.Title>Page Not Found</Typography.Title>
            </Col>
            <Col span={24}>
              <Typography.Text style={{ fontSize: 20 }}>
                Check your spelling in the address bar. Or, try opening this
                site's home page to search or browse for the content.
              </Typography.Text>
            </Col>
            <Col span={24} />
            <Col span={24}>
              <Button
                onClick={() =>
                  history.push(APP_ROUTE.listDaos.generatePath({}))
                }
                type="primary"
              >
                Go to the homepage
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}

export default PageNotFound
