import { Select } from 'antd'

type TypeOfDAOProps = {
  value: string
  setType: (type: string) => void
}

const TypeOfDAO = ({ value, setType }: TypeOfDAOProps) => {
  return (
    <Select
      value={value}
      style={{ textTransform: 'capitalize', width: '100%' }}
      onChange={setType}
    >
      <Select.Option value="all-type">All type of DAO</Select.Option>
      <Select.Option value="flexible-dao">Flexible DAO</Select.Option>
      <Select.Option value="multisig-dao">Multisig DAO</Select.Option>
    </Select>
  )
}

export default TypeOfDAO
