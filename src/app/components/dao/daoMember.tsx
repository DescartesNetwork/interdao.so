import { Spin } from 'antd'
import { useDaoMembers } from 'app/hooks/dao'
import useMetaData from 'app/hooks/useMetaData'
import { useMemo } from 'react'
import { numeric } from 'shared/util'

const DaoMember = ({ daoAddress }: { daoAddress: string }) => {
  const members = useDaoMembers(daoAddress)
  const { metaData } = useMetaData(daoAddress)
  const isMultisig = metaData?.daoType === 'multisig-dao'

  const amountMembers = useMemo(() => {
    if (!isMultisig) return members
    const { members: daoMembers } = metaData
    return daoMembers.length
  }, [isMultisig, members, metaData])

  return (
    <Spin spinning={!amountMembers} size="small">
      <span>{numeric(amountMembers).format('0,0')}</span>
    </Spin>
  )
}

export default DaoMember
