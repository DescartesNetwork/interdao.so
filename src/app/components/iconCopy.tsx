import { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

import { Tooltip } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import { asyncWait } from 'shared/util'

const IconCopy = ({ value }: { value: string }) => {
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    setCopied(true)
    await asyncWait(1500)
    setCopied(false)
  }

  return (
    <Tooltip title="Copied" visible={copied}>
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
