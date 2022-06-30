import { Card, Spin } from 'antd'

const Proposal = () => {
  return (
    <Spin spinning tip="Loading Proposal Data...">
      <Card
        bordered={false}
        className="proposal-card"
        style={{
          background: 'unset',
        }}
        bodyStyle={{ padding: '24px 0', height: 176 }}
        hoverable
      ></Card>
    </Spin>
  )
}

export default Proposal
