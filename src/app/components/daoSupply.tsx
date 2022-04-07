import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { DaoData } from '@interdao/core'
import { useMint } from '@senhub/providers'

import { Space } from 'antd'

import useMintDecimals from 'shared/hooks/useMintDecimals'
import { AppState } from 'app/model'
import { numeric, shortenAddress } from 'shared/util'
import { account } from '@senswap/sen-js'

export const DaoSymbol = ({ daoAddress }: { daoAddress: string }) => {
  const [symbol, setSymbol] = useState<string | undefined>('')
  const { dao } = useSelector((state: AppState) => state)
  const { tokenProvider } = useMint()

  const { mint } = dao[daoAddress] || ({} as DaoData)
  const mintAddress = mint?.toBase58() || ''

  const getMintSymbol = useCallback(async () => {
    if (!account.isAddress(mintAddress)) return setSymbol('')
    try {
      const { symbol } = (await tokenProvider.findByAddress(mintAddress)) || {}
      return setSymbol(symbol)
    } catch (error) {
      return setSymbol('')
    }
  }, [mintAddress, tokenProvider])

  useEffect(() => {
    getMintSymbol()
  }, [getMintSymbol])

  return <span>{symbol || shortenAddress(mintAddress, 3)}</span>
}

export const DaoSupply = ({ daoAddress }: { daoAddress: string }) => {
  const { dao } = useSelector((state: AppState) => state)

  const { supply, mint } = dao[daoAddress] || ({} as DaoData)
  const decimals = useMintDecimals(mint?.toBase58()) || 0
  const circulatingSupply = supply?.toNumber() / 10 ** decimals

  return <span>{numeric(circulatingSupply).format('0,0.[0000]')}</span>
}

const DaoTotal = ({ daoAddress }: { daoAddress: string }) => {
  return (
    <Space size={4}>
      <DaoSupply daoAddress={daoAddress} />
      <DaoSymbol daoAddress={daoAddress} />
    </Space>
  )
}
export default DaoTotal
