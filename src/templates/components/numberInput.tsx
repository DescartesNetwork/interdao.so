import { useEffect } from 'react'

import { InputProps } from 'antd'
import NumericInput from 'shared/antd/numericInput'

const NumberInput = ({
  id,
  value,
  handleChange,
  defaultValue,
  disabled,
  ...rest
}: {
  id: string
  value: string
  handleChange: (id: string, value: string) => void
  defaultValue?: string
} & InputProps) => {
  useEffect(() => {
    if (!!defaultValue) handleChange(id, defaultValue)
  }, [defaultValue, id, handleChange])

  return (
    <NumericInput
      className="border-less"
      placeholder="Input Amount"
      value={value}
      onValue={(value) => handleChange(id, value)}
      {...rest}
      disabled={false}
      readOnly={disabled}
    />
  )
}
export default NumberInput
