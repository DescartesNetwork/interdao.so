import { useCallback, useEffect, useState } from 'react'
import { account } from '@senswap/sen-js'
import { AccountInfo, PublicKey } from '@solana/web3.js'

import { ReceiptData } from '@interdao/core'

export const getReceipts = async (
  proposalAddress: string,
): Promise<Record<string, ReceiptData>> => {
  if (!account.isAddress(proposalAddress)) throw new Error('Invalid address')
  const {
    provider: { connection },
    programId,
    account: { receipt },
  } = window.interDao.program
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
  let bulk: Record<string, ReceiptData> = {}

  value.forEach(({ pubkey, account: { data: buf } }) => {
    const data = window.interDao.parseReceiptData(buf)
    bulk[pubkey.toBase58()] = data
  })
  return bulk
}

const useReceipts = ({ proposalAddress }: { proposalAddress: string }) => {
  const [receipts, setReceipts] = useState<Record<string, ReceiptData>>({})

  const fetchReceipts = useCallback(async () => {
    if (!account.isAddress(proposalAddress)) return setReceipts({})
    const listReceipt = await getReceipts(proposalAddress)
    return setReceipts(listReceipt)
  }, [proposalAddress])

  useEffect(() => {
    fetchReceipts()
  }, [fetchReceipts])

  return { receipts }
}

export default useReceipts
