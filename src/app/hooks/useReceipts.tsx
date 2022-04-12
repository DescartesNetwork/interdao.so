import { useCallback, useEffect } from 'react'
import { account } from '@senswap/sen-js'
import { AccountInfo, PublicKey } from '@solana/web3.js'

import configs from 'app/configs'

const {
  sol: { interDao },
} = configs

const useReceipts = ({ proposalAddress }: { proposalAddress: string }) => {
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
              offset: 16,
              bytes: proposalAddress,
            },
          },
        ],
      })
    console.log(value)
    value.forEach(({ pubkey, account: { data: buf } }) => {
      const address = pubkey.toBase58()
      const data = interDao.parseProposalData(buf)
      console.log(address, data)
    })
  }, [proposalAddress])

  useEffect(() => {
    getReceipts()
  }, [getReceipts])

  return {}
}

export default useReceipts
