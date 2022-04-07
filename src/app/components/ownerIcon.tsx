import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'
import { useWallet } from '@senhub/providers'
import { DaoData } from '@interdao/core'

import { AppState } from 'app/model'
import IonIcon from 'shared/antd/ionicon'

const OwnerIcon = ({ daoAddress }: { daoAddress: string }) => {
  const {
    wallet: { address: walletAddress },
  } = useWallet()
  const { dao } = useSelector((state: AppState) => state)

  const { authority } = dao[daoAddress] || ({} as DaoData)
  const authAddress = authority?.toBase58()
  const isAuthor =
    account.isAddress(authAddress) && authAddress === walletAddress

  if (isAuthor) <IonIcon name="person-outline" />
  return <Fragment />
}
export default OwnerIcon
