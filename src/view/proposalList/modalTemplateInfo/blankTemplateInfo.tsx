import moment from 'moment'

import { Col, Row, Typography } from 'antd'
import RowSpaceBetween from 'components/ui/rowSpaceBetween'
import RowSpaceVertical from 'components/ui/rowSpaceVertical'

const BlankTemplateInfo = ({
  isProposalDetail,
  endTime,
}: {
  isProposalDetail?: boolean
  endTime?: number
}) => {
  if (isProposalDetail)
    return <RowSpaceBetween label="Template" value="Blank" />
  return (
    <Row gutter={[12, 12]}>
      <Col xs={12} md={6}>
        <RowSpaceVertical
          label="Template"
          value={<Typography.Text className="t-16">Blank</Typography.Text>}
        />
      </Col>
      <Col xs={12} md={6}>
        <RowSpaceVertical
          label="End time"
          value={
            endTime && (
              <Typography.Text className="t-16">
                {moment(endTime).format('hh:mm A, MMM Do, YYYY')}
              </Typography.Text>
            )
          }
        />
      </Col>
    </Row>
  )
}

export default BlankTemplateInfo
