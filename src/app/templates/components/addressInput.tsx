import { useDispatch, useSelector } from 'react-redux'

import { InputProps, Space, Typography, Input } from 'antd'

import { AppDispatch, AppState } from 'app/model'
import { setTemplateData } from 'app/model/template.controller'

const AddressInput = ({
  id,
  title,
  ...rest
}: { id: string; title: string } & InputProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const value = useSelector((state: AppState) => state.template.data[id])

  return (
    <Space direction="vertical" size={4} style={{ width: '100%' }}>
      <Typography.Text type="secondary">{title}</Typography.Text>
      <Input
        className="border-less"
        placeholder="Input Address"
        defaultValue={value}
        onChange={(e) =>
          dispatch(setTemplateData({ id, value: e.target.value }))
        }
        {...rest}
      />
    </Space>
  )
}
export default AddressInput
