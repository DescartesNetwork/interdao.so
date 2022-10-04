import { web3 } from '@project-serum/anchor'

import { Button, Col, Row, Space } from 'antd'
import { TemplateData } from 'templates/components/templateForm'

import { TEMPLATE_CONFIGS, IDS } from './configs'
import { PropsCreateComponent } from 'templates/constant'
import { useConfirmIdl } from 'templates/hooks/useConfirmIdl'
import { useDaoData } from 'hooks/dao'
import { notifyError } from 'helpers'

type NativeTemplateData = TemplateData<IDS>

const Create = ({
  daoAddress = '',
  defaultData,
}: PropsCreateComponent<NativeTemplateData>) => {
  const daoData = useDaoData(daoAddress)
  const { confirm, close } = useConfirmIdl()

  const handleConfirm = async () => {
    try {
      const ix = new web3.TransactionInstruction({
        keys: [{ pubkey: daoData?.master!, isSigner: true, isWritable: true }],
        data: Buffer.from('Dao proposal blank', 'utf-8'),
        programId: new web3.PublicKey(
          'MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr',
        ),
      })
      return confirm(daoAddress, TEMPLATE_CONFIGS, {}, [
        new web3.Transaction().add(ix),
      ])
    } catch (error) {
      notifyError(error)
    }
  }

  return (
    <Row gutter={[24, 24]}>
      <Col span={24} />
      <Col span={24} style={{ textAlign: 'right' }}>
        <Space>
          <Button type="text" onClick={close}>
            Close
          </Button>
          <Button type="primary" onClick={handleConfirm}>
            Continue
          </Button>
        </Space>
      </Col>
    </Row>
  )
}

export default Create
