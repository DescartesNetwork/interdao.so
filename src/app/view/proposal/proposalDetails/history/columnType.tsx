import { useEffect, useState } from 'react'
import { ReceiptData } from '@interdao/core'
import { useUI } from '@senhub/providers'

import { Typography } from 'antd'

import { STROKE_COLOR } from 'app/constant'

const ColumnType = ({ record }: { record: ReceiptData }) => {
  const [color, setColor] = useState('')
  const [type, setType] = useState('')
  const {
    ui: { theme },
  } = useUI()

  useEffect(() => {
    const action = Object.keys(record.action || {})[0]
    if (action === 'voteAgainst') {
      setType('VOTE AGAINST')
      return setColor(STROKE_COLOR[theme].against)
    }
    setType('VOTE FOR')
    return setColor(STROKE_COLOR[theme].for)
  }, [record.action, theme])

  return <Typography.Text style={{ color }}>{type}</Typography.Text>
}

export default ColumnType
