import { useSetState } from 'react-use'
import { utils, web3 } from '@project-serum/anchor'
import { Token } from '@solana/spl-token'
import { useGetMintDecimals } from '@sentre/senhub'
import { utilsBN } from 'sentre-web3'

import { Button, Col, Row, Space } from 'antd'
import TemplateForm, { TemplateData } from 'templates/components/templateForm'

import { TEMPLATE_CONFIGS, IDS } from '../spl-approve/configs'
import { PropsCreateComponent } from 'templates/constant'
import { useConfirmIdl } from 'templates/hooks/useConfirmIdl'
import { SPL_TOKEN_PROGRAM_ID } from 'templates/programs/spl-token'
import { useDaoData } from 'hooks/dao'

type NativeTemplateData = TemplateData<IDS>

const Create = ({
  daoAddress = '',
  defaultData,
}: PropsCreateComponent<NativeTemplateData>) => {
  const daoData = useDaoData(daoAddress)
  const [formData, setFormData] = useSetState<NativeTemplateData>(
    defaultData || {
      viewAmount: '',
      viewDelegate: '',
      viewMint: '',
      viewSource: daoData?.master.toBase58()!,
    },
  )
  const { confirm, close } = useConfirmIdl()
  const getMintDecimals = useGetMintDecimals()

  const handleConfirm = async () => {
    const tokenAccount = await utils.token.associatedAddress({
      owner: new web3.PublicKey(formData.viewSource),
      mint: new web3.PublicKey(formData.viewMint),
    })
    const decimals = await getMintDecimals({ mintAddress: formData.viewMint })
    const amountBN = utilsBN.decimalize(formData.viewAmount, decimals!)

    const tx = new web3.Transaction().add(
      Token.createApproveInstruction(
        SPL_TOKEN_PROGRAM_ID,
        tokenAccount,
        new web3.PublicKey(formData.viewDelegate),
        new web3.PublicKey(formData.viewSource),
        [],
        amountBN.toNumber(),
      ),
    )
    return confirm(daoAddress, TEMPLATE_CONFIGS, formData, [tx])
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
