import { util } from '@sentre/senhub'

import { Spin } from 'antd'
import { useDaoMembers } from 'hooks/dao'

const DaoMember = ({ daoAddress }: { daoAddress: string }) => {
  const membersAmount = useDaoMembers(daoAddress)

  if (membersAmount === undefined)
    return (
      <Spin spinning size="small">
        <span>--</span>
      </Spin>
    )

  return <span>{util.numeric(membersAmount).format('0,0')}</span>
}

export default DaoMember
