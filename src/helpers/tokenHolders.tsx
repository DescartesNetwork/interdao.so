import { utils } from '@project-serum/anchor'
import { DataLoader } from '@sentre/senhub'

import configs from 'configs'

const {
  sol: { interDao },
} = configs

const SOLSCAN_BASE_API_URL = 'https://public-api.solscan.io'
const END_POINT_HOLDERS = '/token/holders'

export type HoldersState = { data: any[]; total: number }
export const fetchTokenHoldersFromSolScan = async (mintAddress: string) => {
  const requestUrl = `${SOLSCAN_BASE_API_URL}${END_POINT_HOLDERS}?tokenAddress=${mintAddress}&offset=0&limit=1`

  const data: HoldersState = await fetch(requestUrl).then((responve) =>
    responve.json(),
  )
  return data.total
}

export const fecthTokenHoldersFromSmartContract = async (
  mintAddress: string,
) => {
  const {
    provider: { connection },
  } = interDao.program

  const accounts = await DataLoader.load(
    'getTokenHolders' + mintAddress,
    () => {
      return connection.getProgramAccounts(utils.token.TOKEN_PROGRAM_ID, {
        filters: [
          { dataSize: 165 },
          { memcmp: { bytes: mintAddress, offset: 0 } },
        ],
      })
    },
  )
  return accounts.length || 0
}
