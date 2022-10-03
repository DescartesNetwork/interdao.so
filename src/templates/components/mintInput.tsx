import { useEffect } from 'react'

import { MintSelection } from '@sen-use/app'

const MintInput = ({
  id,
  value,
  handleChange,
  defaultValue,
}: {
  id: string
  value: string
  handleChange: (id: string, value: string) => void
  defaultValue?: string
}) => {
  useEffect(() => {
    if (!!defaultValue) handleChange(id, defaultValue)
  }, [defaultValue, id, handleChange])

  return (
    <MintSelection
      value={value}
      onChange={(value) => handleChange(id, value)}
      style={{ marginLeft: -7 }}
    />
  )
}
export default MintInput
