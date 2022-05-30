import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import useMetaData from 'app/hooks/useMetaData'
import { AppState } from 'app/model'
import { Typography } from 'antd'

type ColumnNameProps = {
  authority: string
  proposalAddress: string
}

const ColumnName = ({ authority, proposalAddress }: ColumnNameProps) => {
  const { proposal } = useSelector((state: AppState) => state)
  const { dao } = proposal?.[proposalAddress]
  const metaData = useMetaData(dao.toBase58())

  const name = useMemo(() => {
    const members = metaData?.members || []
    for (const { walletAddress, name } of members) {
      if (walletAddress === authority) {
        return name
      }
    }
    return '--'
  }, [authority, metaData])

  return <Typography.Text className="t-16">{name}</Typography.Text>
}

export default ColumnName
