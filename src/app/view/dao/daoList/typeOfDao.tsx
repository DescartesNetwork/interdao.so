import { Select } from 'antd'

const TypeOfDAO = () => {
  return (
    <Select
      value="all-type"
      style={{ textTransform: 'capitalize', width: '100%' }}
    >
      <Select.Option value="all-type">All type of DAO</Select.Option>
      <Select.Option
        value="flexible-dao"
        style={{ textTransform: 'capitalize' }}
      >
        Flexible DAO
      </Select.Option>
      <Select.Option
        value="multisig-dao"
        style={{ textTransform: 'capitalize' }}
      >
        Multisig DAO
      </Select.Option>
    </Select>
  )
}

export default TypeOfDAO
