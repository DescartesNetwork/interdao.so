import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'

import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import { AppDispatch, AppState } from 'app/model'
import { getMember, Metadata } from 'app/model/metadata.controller'

const MembersCount = ({ daoAddress }: { daoAddress: string }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { metadata, dao } = useSelector((state: AppState) => state)

  const { members } = useMemo(
    () => metadata[daoAddress] || ({} as Metadata),
    [daoAddress, metadata],
  )
  const isExistDao = useMemo(() => {
    return !!Object.keys(dao).length
  }, [dao])

  useEffect(() => {
    if (isExistDao && account.isAddress(daoAddress)) {
      dispatch(getMember({ daoAddress }))
    }
  }, [dispatch, daoAddress, isExistDao])

  return (
    <span>
      Members (
      {members || (
        <Spin
          size="small"
          spinning
          indicator={<LoadingOutlined style={{ fontSize: 12 }} />}
        />
      )}
      )
    </span>
  )
}

export default MembersCount