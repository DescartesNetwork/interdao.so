import { useCallback, useEffect, useMemo, useState } from 'react'
import { PublicKey } from '@solana/web3.js'
import { AccountData } from '@senswap/sen-js'
import { getMultipleAccounts } from 'sentre-web3/dist/rpc'

import { Col, Empty, Row, Space, Spin, Typography } from 'antd'
import MintBalance from './mintBalance'

import useTotalUSD from 'app/hooks/useBalance'
import { numeric } from 'shared/util'
import { useDaoData } from 'app/hooks/dao'

const Treasury = ({ daoAddress }: { daoAddress: string }) => {
  const [tokenAccounts, setTokenAccounts] = useState<AccountData[]>()
  const daoData = useDaoData(daoAddress)
  const totalUSD = useTotalUSD({ accounts: tokenAccounts || [] })

  const daoMasterAddress = useMemo(
    () => daoData?.master.toBase58(),
    [daoData?.master],
  )

  const fetchTokenAccounts = useCallback(async () => {
    if (!daoMasterAddress || !daoData?.master) return
    const {
      splt: { connection, spltProgramId, parseAccountData, parseMintData },
    } = window.sentre

    const { value } = await connection.getTokenAccountsByOwner(daoData.master, {
      programId: spltProgramId,
    })
    const accounts = value.map(({ account }) => parseAccountData(account.data))
    const mintAccounts = await getMultipleAccounts(
      connection,
      accounts.map((acc) => new PublicKey(acc.mint)),
    )
    const filteredAccounts = accounts.filter((acc, idx) => {
      const mint = mintAccounts[idx]
      if (!mint) return false
      const mintData = parseMintData(mint.account.data)
      const isNft =
        mintData.decimals === 0 && Number(mintData.supply.toString()) === 1
      return !isNft
    })

    return setTokenAccounts(filteredAccounts)
  }, [daoData?.master, daoMasterAddress])

  useEffect(() => {
    fetchTokenAccounts()
  }, [fetchTokenAccounts])

  return (
    <Spin spinning={!tokenAccounts} tip="Loading...">
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Row align="middle">
            <Col flex="auto">
              <Space align="baseline">
                <Typography.Text type="secondary">
                  Treasury Balance
                </Typography.Text>
              </Space>
            </Col>
            <Col>
              <Typography.Title level={4}>
                {numeric(totalUSD).format('$0,0.[000]')}
              </Typography.Title>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={[24, 24]} className="scrollbar" style={{ height: 124 }}>
            {tokenAccounts?.length !== 0 ? (
              tokenAccounts?.map((account) => (
                <Col span={24} key={account.mint}>
                  <MintBalance account={account} />
                </Col>
              ))
            ) : (
              <Col span={24}>
                <Empty description="No Tokens" />
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </Spin>
  )
}

export default Treasury
