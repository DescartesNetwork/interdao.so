import { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { InputProps, Space, Typography, Input, Button } from 'antd'

import { AppDispatch, AppState } from 'app/model'
import { setTemplateData } from 'app/model/template.controller'
import { useDaoData } from 'app/hooks/dao'

type PropsAddressInput = {
  id: string
  title: string
} & InputProps

const AddressInput = ({
  id,
  title,
  defaultValue,
  ...rest
}: PropsAddressInput) => {
  const dispatch = useDispatch<AppDispatch>()
  const value = useSelector((state: AppState) => state.template.data[id])
  const { daoAddress } = useParams<{ daoAddress: string }>()
  const daoData = useDaoData(daoAddress)

  useEffect(() => {
    if (!!defaultValue && value === undefined)
      dispatch(setTemplateData({ [id]: defaultValue.toString() }))
  }, [defaultValue, dispatch, id, value])

  const isMaster = value === daoData?.master.toBase58()

  return (
    <Space direction="vertical" size={4} style={{ width: '100%' }}>
      <Typography.Text type="secondary">{title}</Typography.Text>
      <Input
        className="border-less"
        placeholder="Input Address"
        value={value}
        onChange={(e) => dispatch(setTemplateData({ [id]: e.target.value }))}
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
        {...rest}
      />
    </Space>
  )
}
export default AddressInput
