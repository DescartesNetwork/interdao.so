import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button } from 'antd'

import { AppDispatch, AppState } from 'app/model'
import { setTemplateData } from 'app/model/template.controller'
import { BlankIdl, BlankIds } from '../blank/configs'
import { PropsCreateComponent } from '../index'
import { useConfirmIdl } from '../hooks/useConfirmIdl'

const Create = ({ daoAddress = '' }: PropsCreateComponent) => {
  const dispatch = useDispatch<AppDispatch>()
  const daoData = useSelector((state: AppState) => state.daos[daoAddress])
  const { confirm } = useConfirmIdl()

  const generateData = useCallback(async () => {
    dispatch(
      setTemplateData({
        id: BlankIds.source,
        value: daoData.master.toBase58(),
      }),
    )
    dispatch(
      setTemplateData({
        id: BlankIds.destination,
        value: daoData.master.toBase58(),
      }),
    )
    dispatch(
      setTemplateData({
        id: BlankIds.lamports,
        value: '0',
      }),
    )
    dispatch(
      setTemplateData({
        id: BlankIds.code,
        value: '2',
      }),
    )
  }, [daoData.master, dispatch])
  useEffect(() => {
    generateData()
  }, [generateData])

  return (
    <Button type="primary" onClick={() => confirm(BlankIdl)} disabled={false}>
      New blank proposal
    </Button>
  )
}

export default Create
