import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { InputProps, Space, Typography } from 'antd'
import NumericInput from 'shared/antd/numericInput'

import { AppDispatch, AppState } from 'model'
import { setTemplateData } from 'model/template.controller'

const NumberInput = ({
  id,
  title,
  defaultValue,
  ...rest
}: { id: string; title: string } & InputProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const value = useSelector((state: AppState) => state.template.data[id])

  useEffect(() => {
    if (!!defaultValue && value === undefined)
      dispatch(setTemplateData({ [id]: defaultValue.toString() }))
  }, [defaultValue, dispatch, id, value])

  return (
    <Space direction="vertical" size={4} style={{ width: '100%' }}>
      <Typography.Text type="secondary">{title}</Typography.Text>
      <NumericInput
        className="border-less"
        placeholder="Input Amount"
        defaultValue={value}
        onValue={(val) => dispatch(setTemplateData({ [id]: val }))}
        {...rest}
      />
    </Space>
  )
}
export default NumberInput
