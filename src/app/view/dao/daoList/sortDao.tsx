import { Select } from 'antd'
import { REGIME_LIST } from 'app/view/createDao/setRule/flexible/regimeInput';

type SortDaoProps = { value: string; onSort: (value: string) => void }

const SortDao = ({ onSort, value }: SortDaoProps) => {
  return (
    <Select
      value={value}
      style={{ textTransform: 'capitalize', width: '100%' }}
      onChange={onSort}
    >
      <Select.Option value="all-regime">All mechanisms</Select.Option>
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
