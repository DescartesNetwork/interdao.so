import { useDispatch, useSelector } from 'react-redux'

import { InputProps, Space, Typography } from 'antd'
import NumericInput from 'shared/antd/numericInput'

import { AppDispatch, AppState } from 'app/model'
import { onChangeTemplateData } from 'app/model/template.controller'

const NumberInput = ({
  id,
  title,
  ...rest
}: { id: string; title: string } & InputProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const value = useSelector((state: AppState) => state.template.data[id])

  return (
    <Space direction="vertical" size={4} style={{ width: '100%' }}>
      <Typography.Text type="secondary">{title}</Typography.Text>
      <NumericInput
        className="border-less"
        placeholder="Input Amount"
        defaultValue={value}
        onValue={(value) => dispatch(onChangeTemplateData({ id, value }))}
        {...rest}
      />
    </Space>
  )
}
export default NumberInput
