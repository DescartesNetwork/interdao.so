import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CopyToClipboard from 'react-copy-to-clipboard'

import { Col, Row, Space, Tooltip, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import ModalNftCollection from '../../../components/modalNftCollection'

import { setInitDao } from 'app/model/dao.controller'
import { AppDispatch, AppState } from 'app/model'
import { asyncWait, shortenAddress } from 'shared/util'

const Address = ({ address }: { address: string }) => {
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    setCopied(true)
    await asyncWait(1500)
    setCopied(false)
  }

  return (
    <Space>
      <Typography.Text className="t-16">
        NFT collection address: {shortenAddress(address)}
      </Typography.Text>
      <Tooltip title="Copied" visible={copied}>
        <CopyToClipboard text={address} onCopy={onCopy}>
          <Typography.Text style={{ cursor: 'pointer' }} className="t-16">
            <IonIcon name="copy-outline" />
          </Typography.Text>
        </CopyToClipboard>
      </Tooltip>
    </Space>
  )
}

const VoteNftInput = () => {
  const [visible, setVisible] = useState(false)
  const initDao = useSelector((state: AppState) => state.dao.initDao)
  const dispatch = useDispatch<AppDispatch>()
  const { mintAddress } = initDao

  const onMintAddressChange = (mintAddress: string) => {
    return dispatch(setInitDao({ ...initDao, mintAddress }))
  }
  return (
    <Row gutter={[24, 24]}>
      <Col>
        <ModalNftCollection
          visible={visible}
          setVisible={setVisible}
          onSelect={onMintAddressChange}
        />
      </Col>
      <Col flex={1}>
        <Row align="bottom" style={{ height: '100%' }}>
          <Col span={24}>
            {mintAddress && <Address address={mintAddress} />}
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default VoteNftInput
