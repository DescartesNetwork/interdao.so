import IonIcon from '@sentre/antd-ionicon'
import { Button, Input, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

type SearchDaoProps = {
  onSearch: (keyword: string) => void
  loading?: boolean
  searchText: string
}

const SearchNftCollection = ({ onSearch, loading = false }: SearchDaoProps) => {
  return (
    <Input
      prefix={
        <Button
          type="text"
          size="small"
          icon={
            loading ? (
              <Spin indicator={<LoadingOutlined style={{ fontSize: 14 }} />} />
            ) : (
              <IonIcon name="search-outline" />
            )
          }
        />
      }
      placeholder="Search by collection address"
      style={{ width: '100%' }}
      onChange={(e) => onSearch(e.target.value)}
    />
  )
}
export default SearchNftCollection
