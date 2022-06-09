import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'
import { useWallet } from '@senhub/providers'
import { DaoData } from '@interdao/core'

import { AppState } from 'app/model'
import IonIcon from '@sentre/antd-ionicon'

const OwnerIcon = ({ daoAddress }: { daoAddress: string }) => {
  const {
    wallet: { address: walletAddress },
  } = useWallet()
  const daos = useSelector((state: AppState) => state.daos)

  const { authority } = daos[daoAddress] || ({} as DaoData)
  const authAddress = authority?.toBase58()
  const isAuthor =
    account.isAddress(authAddress) && authAddress === walletAddress

  if (isAuthor) <IonIcon name="person-outline" />
  return <Fragment />
}
export default OwnerIcon
