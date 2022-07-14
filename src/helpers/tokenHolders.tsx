const SOLSCAN_BASE_API_URL = 'https://public-api.solscan.io'
const END_POINT_HOLDERS = '/token/holders'

export type HoldersState = { data: any[]; total: number }
export const fetchTokenHolders = async (mintAddress: string) => {
  const requestUrl = `${SOLSCAN_BASE_API_URL}${END_POINT_HOLDERS}?tokenAddress=${mintAddress}&offset=0&limit=1`

  const data: HoldersState = await fetch(requestUrl).then((responve) =>
    responve.json(),
  )
  return data.total
}
