import { BN } from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'
import { ReceiptData } from '@interdao/core'

import { Typography } from 'antd'
import ColumnType from './columnType'

import { numeric, shortenAddress } from 'shared/util'

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
    render: (_: any, record: ReceiptData) => <ColumnType record={record} />,
  },
  {
    title: 'POWER',
    dataIndex: 'power',
    render: (power: BN) => (
      <Typography>{numeric(power.toNumber()).format('0,0.[0000]a')}</Typography>
    ),
  },
]
