import { useMemo } from 'react'
import { ReceiptData } from '@interdao/core'

import { Typography } from 'antd'

const ColumnType = ({ record }: { record: ReceiptData }) => {
  const type = useMemo(() => {
    const action = Object.keys(record.action || {})[0]
    if (action === 'voteAgainst') return 'DISAGREE'
    return 'AGREE'
  }, [record.action])

  return <Typography.Text>{type}</Typography.Text>
}

export default ColumnType
