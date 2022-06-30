import { PublicKey } from '@solana/web3.js'
import { ReceiptData } from '@interdao/core'
import { util } from '@sentre/senhub'

import { Typography } from 'antd'
import ColumnType from './columnType'
import ColumnPower from './columnPower'

import ColumnName from './columnName'

export const HISTORY_COLUMNS_FLEXIBLE = [
  {
    title: 'WALLET ADDRESS',
    dataIndex: 'authority',
    render: (walletAddress: PublicKey) => (
      <Typography>{util.shortenAddress(walletAddress.toBase58())}</Typography>
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

export const HISTORY_COLUMNS_MULTISIG = [
  {
    title: 'NAME',
    dataIndex: 'authority',
    render: (authority: PublicKey, receipt: ReceiptData) => (
      <ColumnName
        proposalAddress={receipt.proposal.toBase58()}
        authority={authority.toBase58()}
      />
    ),
  },
  {
    title: 'WALLET ADDRESS',
    dataIndex: 'authority',
    render: (walletAddress: PublicKey) => (
      <Typography>{util.shortenAddress(walletAddress.toBase58())}</Typography>
    ),
  },
  {
    title: 'TYPE',
    dataIndex: 'authority',
    render: (_: any, receipt: ReceiptData) => <ColumnType record={receipt} />,
  },
]
