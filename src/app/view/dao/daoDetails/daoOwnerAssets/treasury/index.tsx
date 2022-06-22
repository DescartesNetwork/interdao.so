import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { account, AccountData } from '@senswap/sen-js'

import { Col, Row, Space, Typography } from 'antd'
import MintBalance from './mintBalance'

import { AppState } from 'app/model'
import useTotalUSD from 'app/hooks/useBalance'
import { numeric } from 'shared/util'

const Treasury = ({ daoAddress }: { daoAddress: string }) => {
  const [listAccount, setListAccount] = useState<AccountData[]>([])
  const totalUSD = useTotalUSD({ accounts: listAccount })

  const daos = useSelector((state: AppState) => state.daos)

  const daoMasterAddress = useMemo(() => {
    const { master } = daos[daoAddress] || {}
    return master?.toBase58() || ''
  }, [daos, daoAddress])

  const fetchAccount = useCallback(async () => {
    if (!daoMasterAddress) return

    const { splt } = window.sentre
    const ownerPublicKey = account.fromAddress(daoMasterAddress)
    const { value } = await splt.connection.getTokenAccountsByOwner(
      ownerPublicKey,
      { programId: splt.spltProgramId },
    )
    let bulk: AccountData[] = []
    await Promise.all(
      value.map(async ({ account: { data: buf } }) => {
        const data = splt.parseAccountData(buf)
        const mintInfo = await splt.getMintData(data.mint)
        if (!(mintInfo.decimals === 0) && !(Number(mintInfo.supply) === 1))
          return bulk.push(data)
      }),
    )
    return setListAccount(bulk)
  }, [daoMasterAddress])

  useEffect(() => {
    fetchAccount()
  }, [fetchAccount])

  return (
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
              ${numeric(totalUSD).format('0,0.[000]')}
            </Typography.Title>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[24, 24]} className="scrollbar" style={{ height: 124 }}>
          {listAccount &&
            listAccount.map((account) => (
              <Col span={24} key={account.mint}>
                <MintBalance account={account} />
              </Col>
            ))}
        </Row>
      </Col>
    </Row>
  )
}

export default Treasury
