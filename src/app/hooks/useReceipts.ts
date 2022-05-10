import { useCallback, useEffect, useState } from 'react'
import { account } from '@senswap/sen-js'
import { AccountInfo, PublicKey } from '@solana/web3.js'

import configs from 'app/configs'
import { ReceiptData } from '@interdao/core'

const {
  sol: { interDao },
} = configs

export const getReceipts = async (
  proposalAddress: string,
): Promise<ReceiptData[]> => {
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
  return bulk
}

const useReceipts = ({ proposalAddress }: { proposalAddress: string }) => {
  const [receipts, setReceipts] = useState<ReceiptData[]>([])

  const fetchReceipts = useCallback(async () => {
    if (!account.isAddress(proposalAddress)) return setReceipts([])
    const listReceipt = await getReceipts(proposalAddress)
    return setReceipts(listReceipt)
  }, [proposalAddress])

  useEffect(() => {
    fetchReceipts()
  }, [fetchReceipts])

  return { receipts }
}

export default useReceipts
