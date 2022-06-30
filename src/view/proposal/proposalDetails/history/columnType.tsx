import { useMemo } from 'react'
import { ReceiptData } from '@interdao/core'
import { useUI } from '@sentre/senhub'

import { Typography } from 'antd'

import { STROKE_COLOR } from 'constant'

const VOTE_TYPE = {
  default: 'DEFAULT',
  for: 'VOTE FOR',
  against: 'VOTE AGAINST',
}

const ColumnType = ({ record }: { record: ReceiptData }) => {
  const {
    ui: { theme },
  } = useUI()

  const type = useMemo(() => {
    const action = Object.keys(record.action || {})[0]
    if (action === 'voteAgainst') {
      return 'against'
    }
    if (action === 'voteFor') {
      return 'for'
    }
    return 'default'
  }, [record.action])

  return (
    <Typography.Text style={{ color: STROKE_COLOR[theme][type] }}>
      {VOTE_TYPE[type]}
    </Typography.Text>
  )
}

export default ColumnType
