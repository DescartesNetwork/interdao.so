import { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { util } from '@sentre/senhub'

import { Tooltip } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

const IconCopy = ({ value }: { value: string }) => {
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    setCopied(true)
    await util.asyncWait(1500)
    setCopied(false)
  }

  return (
    <Tooltip title="Copied" open={copied}>
      <CopyToClipboard text={value}>
        <IonIcon
          style={{ cursor: 'pointer' }}
          name="copy-outline"
          onClick={onCopy}
        />
      </CopyToClipboard>
    </Tooltip>
  )
}

export default IconCopy
