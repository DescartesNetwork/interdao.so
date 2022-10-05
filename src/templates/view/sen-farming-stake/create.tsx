import { useCallback, useEffect } from 'react'
import { useSetState } from 'react-use'
import { web3 } from '@project-serum/anchor'
import { util } from '@sentre/senhub'

import { Button, Col, Row, Space } from 'antd'
import TemplateForm, { TemplateData } from 'templates/components/templateForm'

import { TEMPLATE_CONFIGS, IDS } from './configs'
import { PropsCreateComponent } from 'templates/constant'
import { useConfirmIdl } from 'templates/hooks/useConfirmIdl'
import { useDaoData } from 'hooks/dao'
import { notifyError } from 'helpers'
import { useFarming } from './useFarming'

type NativeTemplateData = TemplateData<IDS>

const Create = ({
  daoAddress = '',
  defaultData,
}: PropsCreateComponent<NativeTemplateData>) => {
  const daoData = useDaoData(daoAddress)
  const [formData, setFormData] = useSetState<NativeTemplateData>(
    defaultData || {
      amount: '',
      mint: '',
      farm: '',
    },
  )
  const { confirm, close } = useConfirmIdl()
  const { getSenFarming, stake } = useFarming()

  const updateMint = useCallback(async () => {
    if (!util.isAddress(formData.farm)) return
    const senFarming = getSenFarming(daoData?.master!)
    const farmData = await senFarming.program.account.farm.fetch(formData.farm)
    setFormData({ mint: farmData.inputMint.toBase58() })
  }, [daoData?.master, formData.farm, getSenFarming, setFormData])
  useEffect(() => {
    updateMint()
  }, [updateMint])

  const handleConfirm = async () => {
    try {
      const txs = await stake({
        inAmount: Number(formData.amount),
        farm: new web3.PublicKey(formData.farm),
        walletPublicKey: daoData?.master!,
      })
      return confirm(daoAddress, TEMPLATE_CONFIGS, formData, txs)
    } catch (error) {
      notifyError(error)
    }
  }

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <TemplateForm
          templateData={formData}
          components={TEMPLATE_CONFIGS.components}
          onChange={setFormData}
        />
      </Col>
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
