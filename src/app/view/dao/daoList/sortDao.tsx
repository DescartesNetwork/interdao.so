import { Select } from 'antd'
import { REGIME_LIST } from '../daoInitialization/daoRule/regimeInput'

type SortDaoProps = { onSort: (value: string) => void }

const SortDao = ({ onSort }: SortDaoProps) => {
  return (
    <Select
      defaultValue="all"
      style={{ textTransform: 'capitalize' }}
      onChange={onSort}
    >
      <Select.Option value="all">All regime</Select.Option>
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
