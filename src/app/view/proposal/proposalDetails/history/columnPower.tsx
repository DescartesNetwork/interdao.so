import { useSelector } from 'react-redux'
import { DaoData, ReceiptData } from '@interdao/core'
import { utils } from '@senswap/sen-js'

import { Typography } from 'antd'

import { AppState } from 'app/model'
import useMintDecimals from 'shared/hooks/useMintDecimals'
import { numeric } from 'shared/util'

const ColumnPower = ({ receipt }: { receipt: ReceiptData }) => {
  const daos = useSelector((state: AppState) => state.dao.daos)
  const proposal = useSelector((state: AppState) => state.proposal)
  const { power, proposal: proposalPubkey } = receipt
  const { dao: daoPubkey } = proposal[proposalPubkey.toBase58()] || {}
  const { mint } = daos[daoPubkey?.toBase58() || ''] || ({} as DaoData)
  const mintDecimal = useMintDecimals(mint?.toBase58()) || 0

  return (
    <Typography.Text>
      {numeric(
        utils.undecimalize(BigInt(power.toNumber()), mintDecimal),
      ).format('0,0.[0000]a')}
    </Typography.Text>
  )
}

export default ColumnPower
