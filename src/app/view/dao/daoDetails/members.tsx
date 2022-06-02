import { useMemo, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

import { Col, Row, Space, Tooltip, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import useMembers from 'app/hooks/useMembers'
import useMetaData from 'app/hooks/useMetaData'
import { asyncWait, numeric, shortenAddress } from 'shared/util'

const InfoMember = ({ daoAddress }: { daoAddress: string }) => {
  const [copied, setCopied] = useState('address')
  const metaData = useMetaData(daoAddress)

  const onCopy = async (address: string) => {
    setCopied(address)
    await asyncWait(1500)
    setCopied('address')
  }

  return (
    <Row gutter={[8, 8]}>
      {metaData?.members.map(({ name, walletAddress }, index) => (
        <Col span={24} key={walletAddress + index}>
          <Row>
            <Col flex="auto">
              <Typography.Text key={index} className="t-16">
                {name}
              </Typography.Text>
            </Col>
            <Col>
              <Space>
                <Typography.Text type="secondary">
                  {shortenAddress(walletAddress)}
                </Typography.Text>
                <Tooltip title="Copied" visible={copied === walletAddress}>
                  <CopyToClipboard
                    text={walletAddress}
                    onCopy={() => onCopy(walletAddress)}
                  >
                    <Typography.Text
                      style={{ cursor: 'pointer' }}
                      type="secondary"
                    >
                      <IonIcon name="copy-outline" />
                    </Typography.Text>
                  </CopyToClipboard>
                </Tooltip>
              </Space>
            </Col>
          </Row>
        </Col>
      ))}
    </Row>
  )
}

const AmountMembers = ({ daoAddress }: { daoAddress: string }) => {
  const members = useMembers(daoAddress)
  const metaData = useMetaData(daoAddress)
  const isMultisig = metaData?.daoType === 'multisig-dao'

  const amountMembers = useMemo(() => {
    if (!isMultisig) return members
    const { members: daoMembers } = metaData
    return daoMembers.length
  }, [isMultisig, members, metaData])

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Space align="baseline">
          <Typography.Text className="caption" type="secondary">
            Members
          </Typography.Text>
          {isMultisig && (
            <Tooltip
              placement="bottomLeft"
              overlayClassName="info-member"
              title={<InfoMember daoAddress={daoAddress} />}
            >
              <IonIcon
                style={{ cursor: 'pointer' }}
                name="information-circle-outline"
              />
            </Tooltip>
          )}
        </Space>
      </Col>
      <Col span={24}> {numeric(amountMembers).format('0,0')}</Col>
    </Row>
  )
}
export default AmountMembers
