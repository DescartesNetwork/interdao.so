import { useCallback } from 'react'
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

  const onConfirm = useCallback(async () => {
    const defaultData: Record<string, string> = {
      [BlankIds.code]: '2',
      [BlankIds.lamports]: '0',
      [BlankIds.source]: daoData.master.toBase58(),
      [BlankIds.destination]: daoData.master.toBase58(),
    }
    await dispatch(setTemplateData(defaultData))
    confirm(BlankIdl)
  }, [confirm, daoData.master, dispatch])

  return (
    <Button size="small" onClick={onConfirm} disabled={false}>
      New blank proposal
    </Button>
  )
}

export default Create
