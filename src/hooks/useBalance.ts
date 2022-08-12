import { useCallback, useEffect, useState } from 'react'
import { AccountData, utils } from '@senswap/sen-js'
import {
  TokenProvider,
  tokenProvider,
  useGetMintDecimals,
  util,
} from '@sentre/senhub'

const DEFAULT_DATA = {
  address: '',
  icon: '',
  name: 'TOKEN',
  price: 0,
  priceChange: 0,
  rank: 0,
  symbol: 'TOKEN',
  totalVolume: 0,
}

export const fetchCgkData = async (
  tokenProvider: TokenProvider,
  mintAddress: string,
) => {
  try {
    const token = await tokenProvider.findByAddress(mintAddress)
    const ticket = token?.extensions?.coingeckoId
    const cgkData = await util.fetchCGK(ticket)
    return cgkData
  } catch (error) {
    return DEFAULT_DATA
  }
}

export const getBalance = async (
  inUSD: boolean,
  tokenProvider: TokenProvider,
  mintAddress: string,
  decimals: number,
  amount: bigint,
) => {
  const cgkData = await fetchCgkData(tokenProvider, mintAddress)
  let balance = Number(utils.undecimalize(amount, decimals))
  if (inUSD) balance = Number(balance) * cgkData.price

  return balance
}

const useTotalUSD = ({
  inUSD = true,
  accounts,
}: {
  inUSD?: boolean
  accounts: AccountData[]
}) => {
  const getDecimals = useGetMintDecimals()
  const [totalUSD, setTotalUSD] = useState(0)

  const clcTotalUSD = useCallback(async () => {
    if (!accounts) return setTotalUSD(0)
    let totalUSD = 0
    for (const account of accounts) {
      const { mint, amount } = account
      const decimals = (await getDecimals({ mintAddress: mint })) || 0
      const balance = await getBalance(
        inUSD,
        tokenProvider,
        mint,
        decimals,
        amount,
      )
      totalUSD += balance
    }
    return setTotalUSD(totalUSD)
  }, [accounts, getDecimals, inUSD])

  useEffect(() => {
    clcTotalUSD()
  }, [clcTotalUSD])

  return totalUSD
}

export default useTotalUSD
