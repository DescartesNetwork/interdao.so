import { useDispatch, useSelector } from 'react-redux'

import { InputProps, Space, Typography, Input } from 'antd'

import { AppDispatch, AppState } from 'app/model'
import { setTemplateData } from 'app/model/template.controller'

type PropsAddressInput = {
  id: string
  title: string
} & InputProps

const AddressInput = ({ id, title, ...rest }: PropsAddressInput) => {
  const dispatch = useDispatch<AppDispatch>()
  const value = useSelector((state: AppState) => state.template.data[id])

  return (
    <Space direction="vertical" size={4} style={{ width: '100%' }}>
      <Typography.Text type="secondary">{title}</Typography.Text>
      <Input
        className="border-less"
        placeholder="Input Address"
        value={value}
        onChange={(e) => dispatch(setTemplateData({ [id]: e.target.value }))}
        {...rest}
      />
    </Space>
  )
}
export default AddressInput