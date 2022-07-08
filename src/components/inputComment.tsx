import { Card, Col, Input, Row, Typography } from 'antd'

type InputCommentProps = {
  value: string
  onChange: (comment: string) => void
  placeholder?: string
}

const InputComment = ({
  onChange,
  value,
  placeholder = 'Enter your comment...',
}: InputCommentProps) => {
  return (
    <Card
      className="numric-ip-card"
      bodyStyle={{ padding: '8px 12px' }}
      bordered={false}
    >
      <Row gutter={[8, 8]}>
        <Col>
          <Typography.Text type="secondary">
            Add a comment (Optional)
          </Typography.Text>
        </Col>
        <Col span={24}>
          <Input
            bordered={false}
            style={{ padding: 0 }}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </Col>
      </Row>
    </Card>
  )
}

export default InputComment
