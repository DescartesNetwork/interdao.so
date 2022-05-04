import { Select } from 'antd'
import { REGIME_LIST } from '../daoInitialization/daoRule/regimeInput'

type SortDaoProps = { value: string; onSort: (value: string) => void }

const SortDao = ({ onSort, value }: SortDaoProps) => {
  return (
    <Select
      value={value}
      style={{ textTransform: 'capitalize' }}
      onChange={onSort}
    >
      <Select.Option value="all-regime">All regime</Select.Option>
      {REGIME_LIST.map((regime, idx) => {
        const value = Object.keys(regime)[0]
        return (
          <Select.Option
            key={idx}
            value={value}
            style={{ textTransform: 'capitalize' }}
          >
            {value}
          </Select.Option>
        )
      })}
    </Select>
  )
}

export default SortDao
