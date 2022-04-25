import { useMemo } from 'react'
import { DaoRegime, DaoRegimes } from '@interdao/core'
import isEqual from 'react-fast-compare'

import { Tag } from 'antd'

import { randomColor } from 'shared/util'

export type RegimeTagProps = { regime: DaoRegime; special?: boolean }

const RegimeTag = ({ regime, special }: RegimeTagProps) => {
  const tag = useMemo(() => {
    if (isEqual(regime, DaoRegimes.Dictatorial)) return 'Dictatorial'
    if (isEqual(regime, DaoRegimes.Democratic)) return 'Democratic'
    if (isEqual(regime, DaoRegimes.Autonomous)) return 'Autonomous'
    return 'DAO Regime'
  }, [regime])

  const className = special ? 'regime-tag' : ''

  return (
    <Tag
      className={className}
      style={{ color: randomColor(tag), margin: 0 }}
      color={randomColor(tag, 0.2)}
    >
      {tag}
    </Tag>
  )
}

export default RegimeTag
