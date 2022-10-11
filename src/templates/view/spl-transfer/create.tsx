import { useSetState } from 'react-use'
import { utils, web3 } from '@project-serum/anchor'
import { Token } from '@solana/spl-token'
import { useGetMintDecimals } from '@sentre/senhub'
import { utilsBN } from '@sen-use/web3'

import { Button, Col, Row, Space } from 'antd'
import TemplateForm, { TemplateData } from 'templates/components/templateForm'

import { TEMPLATE_CONFIGS, IDS } from './configs'
import { PropsCreateComponent } from 'templates/constant'
import { useConfirmIdl } from 'templates/hooks/useConfirmIdl'
import { SPL_TOKEN_PROGRAM_ID } from 'templates/programs/spl-token'
import { useDaoData } from 'hooks/dao'
import { notifyError } from 'helpers'

type NativeTemplateData = TemplateData<IDS>

const Create = ({
  daoAddress = '',
  defaultData,
}: PropsCreateComponent<NativeTemplateData>) => {
  const daoData = useDaoData(daoAddress)
  const [formData, setFormData] = useSetState<NativeTemplateData>(
    defaultData || {
      amount: '',
      sender: daoData?.master.toBase58()!,
      mint: '',
      receiver: '',
    },
  )
  const { confirm, close } = useConfirmIdl()
  const getMintDecimals = useGetMintDecimals()

  const handleConfirm = async () => {
    try {
      const srcTokenAccount = await utils.token.associatedAddress({
        owner: new web3.PublicKey(formData.sender),
        mint: new web3.PublicKey(formData.mint),
      })
      const dstTokenAccount = await utils.token.associatedAddress({
        owner: new web3.PublicKey(formData.receiver),
        mint: new web3.PublicKey(formData.mint),
      })
      const decimals = await getMintDecimals({ mintAddress: formData.mint })
      const amountBN = utilsBN.decimalize(formData.amount, decimals!)

      const tx = new web3.Transaction().add(
        Token.createTransferInstruction(
          SPL_TOKEN_PROGRAM_ID,
          srcTokenAccount,
          dstTokenAccount,
          new web3.PublicKey(formData.sender),
          [],
          amountBN.toNumber(),
        ),
      )
      return confirm(daoAddress, TEMPLATE_CONFIGS, formData, [tx])
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
