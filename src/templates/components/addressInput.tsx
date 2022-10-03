import { Fragment, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Input, Button } from 'antd'

import { useDaoData } from 'hooks/dao'

const AddressInput = ({
  id,
  defaultValue,
  value,
  handleChange,
}: {
  id: string
  value: string
  handleChange: (id: string, value: string) => void
  defaultValue?: string
}) => {
  const { daoAddress } = useParams<{ daoAddress: string }>()
  const daoData = useDaoData(daoAddress)

  useEffect(() => {
    if (!!defaultValue) handleChange(id, defaultValue)
  }, [defaultValue, id, handleChange])

  const isMaster = value === daoData?.master.toBase58()

  return (
    <Input
      className="border-less"
      placeholder="Input Address"
      value={value}
      onChange={(e) => handleChange(id, e.target.value)}
      prefix={
        isMaster ? (
          <Button
            type="dashed"
            size="small"
            style={{ marginLeft: -4, marginRight: 2, borderWidth: 0.5 }}
          >
            Master
          </Button>
        ) : (
          <Fragment />
        )
      }
    />
  )
}
export default AddressInput
