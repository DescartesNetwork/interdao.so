import { useState } from 'react'
import { util } from '@sentre/senhub'
import CopyToClipboard from 'react-copy-to-clipboard'

import { Space, Tooltip, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

export const ShortenAddress = ({
  address,
  size = 3,
}: {
  address: string
  size?: number
}) => {
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    setCopied(true)
    await util.asyncWait(1500)
    setCopied(false)
  }

  return (
    <Space size={10}>
      <Typography.Text
        style={{ cursor: 'pointer', textDecoration: 'underline' }}
        onClick={() => window.open(util.explorer(address), '_blank')}
      >
        {util.shortenAddress(address, size)}
      </Typography.Text>
      <Tooltip title="Copied" visible={copied}>
        <CopyToClipboard text={address} onCopy={onCopy}>
          <IonIcon
            style={{ cursor: 'pointer' }}
            name="copy-outline"
            onClick={onCopy}
          />
        </CopyToClipboard>
      </Tooltip>
    </Space>
  )
}
