import { PublicKey } from '@solana/web3.js'
import { ReceiptData } from '@interdao/core'

import { Typography } from 'antd'
import ColumnType from './columnType'
import ColumnPower from './columnPower'

import { shortenAddress } from 'shared/util'

export const HISTORY_COLUMNS = [
  {
    title: 'WALLET ADDRESS',
    dataIndex: 'authority',
    render: (walletAddress: PublicKey) => (
      <Typography>{shortenAddress(walletAddress.toBase58())}</Typography>
    ),
  },
  {
    title: 'TYPE',
    dataIndex: 'authority',
    render: (_: any, receipt: ReceiptData) => <ColumnType record={receipt} />,
  },
  {
    title: 'POWER',
    dataIndex: 'power',
    render: (_: any, receipt: ReceiptData) => <ColumnPower receipt={receipt} />,
  },
]
