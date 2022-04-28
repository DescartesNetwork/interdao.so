import { Input } from 'antd'

type SearchDaoProps = {
  onSearch: (keyword: string) => void
}

const SearchDao = ({ onSearch }: SearchDaoProps) => {
  return (
    <Input
      style={{ width: '100%' }}
      onChange={(e) => onSearch(e.target.value)}
    />
  )
}
export default SearchDao
