import { useCallback, useMemo, useState } from 'react'
import { web3 } from '@project-serum/anchor'
import EmbeddedView from '@sentre/embeded-view'

import { Button, Col, Modal, Row, Space } from 'antd'
import { TemplateData } from 'templates/components/templateForm'

import { TEMPLATE_CONFIGS, IDS } from './configs'
import { PropsCreateComponent } from 'templates/constant'
import { useConfirmIdl } from 'templates/hooks/useConfirmIdl'
// import { useDaoData } from 'hooks/dao'

type NativeTemplateData = TemplateData<IDS>

const Create = ({
  daoAddress = '',
  defaultData,
}: PropsCreateComponent<NativeTemplateData>) => {
  const [visible, setVisible] = useState(false)
  // const daoData = useDaoData(daoAddress)
  const { confirm, close } = useConfirmIdl()

  const handleConfirmTransaction = useCallback(
    async (txs: web3.Transaction[]) => {
      setVisible(false)
      return confirm(
        daoAddress,
        { ...TEMPLATE_CONFIGS, title: defaultData?.title! },
        { ...defaultData },
        txs,
      )
    },
    [confirm, daoAddress, defaultData],
  )

  const daoWallet: WalletInterface = useMemo(() => {
    // const masterAddress = daoData?.master.toBase58()
    return {
      ...window.sentre.wallet,
      disconnect: async () => {
        setVisible(false)
      },
      signAllTransactions: async (txs) => {
        handleConfirmTransaction(txs)
        throw new Error("Dao Wallet can't sign transaction")
      },
      signTransaction: async (tx) => {
        handleConfirmTransaction([tx])
        throw new Error("Dao Wallet can't sign transaction")
      },
      getAddress: async () => 'ExoMXqxEGY6ZexUhswjLsBiwZP3QBtWZZGvKzEKvCqqp', // masterAddress!,
    }
  }, [handleConfirmTransaction])

  if (!defaultData) return null
  return (
    <Row gutter={[24, 24]}>
      <Modal
        title={'InterDao Wallet'}
        open={visible}
        style={{
          top: 0,
          minWidth: '100vw',
          maxWidth: '100vw',
          width: '100vw',
          height: '100vh',
          minHeight: '100vh',
          maxHeight: '100vh',
        }}
        bodyStyle={{
          width: '100%',
          height: 'calc(100vh - 55px)',
          maxHeight: '100%',
          minHeight: '100%',
          paddingLeft: 12,
        }}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <EmbeddedView
          wallet={daoWallet}
          appId={defaultData.appId}
          src={defaultData.url}
          title="Inter Dao Master Wallet"
        />
      </Modal>
      <Col span={24} style={{ textAlign: 'right' }}>
        <Space>
          <Button type="text" onClick={close}>
            Close
          </Button>
          <Button type="primary" onClick={() => setVisible(true)}>
            Open Application
          </Button>
        </Space>
      </Col>
    </Row>
  )
}

export default Create
