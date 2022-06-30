import { Tag } from 'antd'

export type ProposalStatusType =
  | 'Failed'
  | 'Voting'
  | 'Preparing'
  | 'Succeeded'
  | 'Executed'
  | 'Loading'

export type ProposalStatusProps = {
  status: ProposalStatusType
}

const STATUS_COLOR: Record<string, string> = {
  Succeeded: '#0CA1BF',
  Failed: '#F9575E',
  Preparing: '#D4B106',
  Executed: '#03A326',
  Voting: '#40A9FF',
  Loading: '#1a1311',
}

const ProposalStatus = ({ status }: ProposalStatusProps) => {
  return (
    <Tag
      style={{ color: STATUS_COLOR[status], border: 'solid', margin: 0 }}
      color={'transparent'}
    >
      {status}
    </Tag>
  )
}

export default ProposalStatus
