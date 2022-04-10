import { useMemo } from 'react'
import { ConsensusMechanisms, ConsensusMechanism } from '@interdao/core'
import isEqual from 'react-fast-compare'

import { Tag } from 'antd'

import { randomColor } from 'shared/util'

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
    return 'Consensus Mechanism'
  }, [consensusMechanism])

  return (
    <Tag
      style={{ color: randomColor(tag), margin: 0 }}
      color={randomColor(tag, 0.2)}
    >
      {tag}
    </Tag>
  )
}

export default ConsensusMechanismTag
