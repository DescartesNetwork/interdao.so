import { useDispatch, useSelector } from 'react-redux'

import { Space, Typography } from 'antd'

import { AppDispatch, AppState } from 'app/model'
import { onChangeTemplateData } from 'app/model/template.controller'
import { MintSelection } from 'shared/antd/mint'

const MintInput = ({ id, title }: { id: string; title?: string }) => {
  const dispatch = useDispatch<AppDispatch>()
  const value = useSelector((state: AppState) => state.template.data[id])

  return (
    <Space direction="vertical" size={4} style={{ width: '100%' }}>
      {title && <Typography.Text type="secondary">{title}</Typography.Text>}
      <MintSelection
        value={value}
        onChange={(value) => {
          dispatch(onChangeTemplateData({ id, value }))
        }}
        style={{ marginLeft: -7 }}
      />
    </Space>
  )
}
export default MintInput
