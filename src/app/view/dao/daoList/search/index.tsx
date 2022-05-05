import { Button, Input } from 'antd'
import IonIcon from 'shared/antd/ionicon'

type SearchDaoProps = {
  onSearch: (keyword: string) => void
}

const SearchDao = ({ onSearch }: SearchDaoProps) => {
  return (
    <Input
      prefix={
        <Button
          type="text"
          size="small"
          icon={<IonIcon name="search-outline" />}
        />
      }
      placeholder="Search by name, address"
      style={{ width: '100%' }}
      onChange={(e) => onSearch(e.target.value)}
    />
  )
}
export default SearchDao
