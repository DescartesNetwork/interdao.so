import { Tag } from 'antd'

import { randomColor } from 'shared/util'

export type ProposalStatusType = 'Completed' | 'Voting' | 'Preparing'
export type ProposalStatusProps = {
  status: ProposalStatusType
}

const ProposalStatus = ({ status }: ProposalStatusProps) => {
  return (
    <Tag
      style={{ color: randomColor(status), margin: 0 }}
      color={randomColor(status, 0.2)}
    >
      {status}
    </Tag>
  )
}

export default ProposalStatus
