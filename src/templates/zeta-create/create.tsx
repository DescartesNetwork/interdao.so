import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'

import { Button, Col, Empty, Row, Space } from 'antd'

import { AppState } from 'model'
import { ZetaCreateIdl, ZetaCreateIds } from './configs'
import { PropsCreateComponent } from '../index'
import { useConfirmIdl } from '../hooks/useConfirmIdl'
import { useDaoData } from 'hooks/dao'
import { zetaCreateParams } from 'helpers/zetaClient'

const Create = ({ daoAddress = '' }: PropsCreateComponent) => {
  const daoData = useDaoData(daoAddress)
  const templateData = useSelector((state: AppState) => state.template.data)
  const { confirm, close } = useConfirmIdl()
  const [loading, setLoading] = useState(false)

  const onConfirm = useCallback(async () => {
    try {
      if (!daoData) throw new Error('Invalid DAO data')
      setLoading(true)
      const masterAddress = daoData.master.toBase58()
      const { marginAccount, zetaGroup } = await zetaCreateParams(masterAddress)

      const defaultData = {
        [ZetaCreateIds.zetaGroup]: zetaGroup.toBase58(),
        [ZetaCreateIds.marginAccount]: marginAccount.toBase58(),
        [ZetaCreateIds.authority]: masterAddress,
        [ZetaCreateIds.payer]: masterAddress,
        [ZetaCreateIds.systemProgram]: '11111111111111111111111111111111',
        [ZetaCreateIds.zetaProgram]:
          'BG3oRikW8d16YjUEmX3ZxHm9SiJzrGtMhsSR8aCw1Cd7',
      }
      return confirm(ZetaCreateIdl, defaultData, true)
    } catch (er: any) {
      window.notify({ type: 'error', description: er.message })
    } finally {
      setLoading(false)
    }
  }, [confirm, daoData])
  console.log(templateData)

  if (!daoData) return <Empty description="Invalid DAO data" />

  return (
    <Row gutter={[24, 24]}>
      <Col span={24} />
      <Col span={24} style={{ textAlign: 'right' }}>
        <Space>
          <Button type="text" onClick={close}>
            Close
          </Button>
          <Button type="primary" onClick={onConfirm} loading={loading}>
            Continue
          </Button>
        </Space>
      </Col>
    </Row>
  )
}

export default Create
