import { useCallback, useEffect, useState } from 'react'
import { tokenProvider } from '@sentre/senhub'
import { AccountData } from '@senswap/sen-js'
import { util } from '@sentre/senhub'

import { Col, Row, Space, Typography } from 'antd'

import { getBalance } from 'hooks/useBalance'
import { MintAvatar, MintSymbol } from '@sen-use/app'

import useMintDecimals from 'shared/hooks/useMintDecimals'

const MintBalance = ({ account }: { account: AccountData }) => {
  const [usdBalance, setUSDBalance] = useState(0)
  const [mintBalance, setMintBalance] = useState(0)

  const { mint, amount } = account
  const decimals = useMintDecimals(mint) || 0

  const fetchBalance = useCallback(async () => {
    const mintBalance = await getBalance(
      false,
      tokenProvider,
      mint,
      decimals,
      amount,
    )
    const usdBalance = await getBalance(
      true,
      tokenProvider,
      mint,
      decimals,
      amount,
    )
    setMintBalance(mintBalance)
    setUSDBalance(usdBalance)
  }, [amount, decimals, mint])

  useEffect(() => {
    fetchBalance()
  }, [fetchBalance])

  return (
    <Row align="middle">
      <Col flex="auto">
        <Space>
          <MintAvatar mintAddress={mint} />
          <Space size={4}>
            {util.numeric(mintBalance).format('0,0.[000]')}
            <Typography.Text type="secondary">
              <MintSymbol mintAddress={mint} />
            </Typography.Text>
          </Space>
        </Space>
      </Col>
      <Col>
        <Typography.Text type="secondary">
          ${util.numeric(usdBalance).format('0,0.[000]')}
        </Typography.Text>
      </Col>
    </Row>
  )
}

export default MintBalance
