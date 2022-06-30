import { useMemo } from 'react'
import { DaoRegime, DaoRegimes } from '@interdao/core'
import isEqual from 'react-fast-compare'

import { Tag } from 'antd'

export type RegimeTagProps = { regime: DaoRegime; special?: boolean }

const RegimeTag = ({ regime, special }: RegimeTagProps) => {
  const tag = useMemo(() => {
    if (isEqual(regime, DaoRegimes.Dictatorial)) return 'Dictatorial'
    if (isEqual(regime, DaoRegimes.Democratic)) return 'Democratic'
    if (isEqual(regime, DaoRegimes.Autonomous)) return 'Autonomous'
    return 'DAO Regime'
  }, [regime])

  const className = special ? 'regime-tag dao-tag' : 'dao-tag'

  return (
    <Tag className={className} style={{ margin: 0 }}>
      {tag}
    </Tag>
  )
}

export default RegimeTag
