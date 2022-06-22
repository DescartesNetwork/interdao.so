import { useCallback } from 'react'
import { useSelector } from 'react-redux'

import { Button } from 'antd'

import { AppState } from 'app/model'
import { BlankIdl, BlankIds } from '../blank/configs'
import { PropsCreateComponent } from '../index'
import { useConfirmIdl } from '../hooks/useConfirmIdl'

const Create = ({ daoAddress = '' }: PropsCreateComponent) => {
  const daoData = useSelector((state: AppState) => state.daos[daoAddress])
  const { confirm } = useConfirmIdl()

  const onConfirm = useCallback(async () => {
    const defaultData: Record<string, string> = {
      [BlankIds.code]: '2',
      [BlankIds.lamports]: '0',
      [BlankIds.source]: daoData.master.toBase58(),
      [BlankIds.destination]: daoData.master.toBase58(),
      [BlankIds.authority]: daoData.master.toBase58(),
    }
    return confirm(BlankIdl, { ...defaultData })
  }, [confirm, daoData.master])

  return (
    <Button size="small" onClick={onConfirm} disabled={false}>
      New blank proposal
    </Button>
  )
}

export default Create
