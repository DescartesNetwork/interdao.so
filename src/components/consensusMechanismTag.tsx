import { useMemo } from 'react'
import { ConsensusMechanisms, ConsensusMechanism } from '@interdao/core'
import isEqual from 'react-fast-compare'
import { util } from '@sentre/senhub'

import { Tag } from 'antd'

export type ConsensusMechanismTagProps = {
  consensusMechanism: ConsensusMechanism
}

const ConsensusMechanismTag = ({
  consensusMechanism,
}: ConsensusMechanismTagProps) => {
  const tag = useMemo(() => {
    if (isEqual(consensusMechanism, ConsensusMechanisms.StakedTokenCounter))
      return 'StakedTokenCounter'
    if (isEqual(consensusMechanism, ConsensusMechanisms.LockedTokenCounter))
      return 'LockedTokenCounter'
    return 'Voting Mechanism'
  }, [consensusMechanism])

  return (
    <Tag
      style={{ color: util.randomColor(tag), margin: 0 }}
      color={util.randomColor(tag, 0.2)}
    >
      {tag}
    </Tag>
  )
}

export default ConsensusMechanismTag
