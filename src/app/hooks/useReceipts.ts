import { useCallback, useEffect, useState } from 'react'
import { account } from '@senswap/sen-js'
import { AccountInfo, PublicKey } from '@solana/web3.js'

import configs from 'app/configs'
import { ReceiptData } from '@interdao/core'

const {
  sol: { interDao },
} = configs

const useReceipts = ({ proposalAddress }: { proposalAddress: string }) => {
  const [receipts, setReceipts] = useState<ReceiptData[]>([])
  const getReceipts = useCallback(async () => {
    if (!account.isAddress(proposalAddress)) throw new Error('Invalid address')
    const {
      provider: { connection },
      programId,
      account: { receipt },
    } = interDao.program
    const value: Array<{ pubkey: PublicKey; account: AccountInfo<Buffer> }> =
      await connection.getProgramAccounts(programId, {
        filters: [
          { dataSize: receipt.size },
          {
            memcmp: {
              offset: 48,
              bytes: proposalAddress,
            },
          },
        ],
      })
    let bulk: ReceiptData[] = []

    value.forEach(({ account: { data: buf } }) => {
      const data = interDao.parseReceiptData(buf)
      bulk.push(data)
    })
    setReceipts(bulk)
  }, [proposalAddress])

  useEffect(() => {
    getReceipts()
  }, [getReceipts])

  return { receipts }
}

export default useReceipts
