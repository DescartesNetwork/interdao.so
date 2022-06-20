import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { CID } from 'ipfs-core'
import BN from 'bn.js'
import { account, DEFAULT_EMPTY_ADDRESS } from '@senswap/sen-js'
import { useWallet } from '@senhub/providers'

import IPFS from 'app/helpers/ipfs'
import { explorer } from 'shared/util'
import { AppState } from 'app/model'
import configs from 'app/configs'
import MultisigWallet from 'app/helpers/mutisigWallet'
import Distributor from 'app/helpers/distributor'
import usePDB from '../usePDB'

const {
  sol: { interDao },
  manifest: { appId },
} = configs

const useMultisigDao = () => {
  const [loading, setLoading] = useState(false)
  const createDaoData = useSelector((state: AppState) => state.createDao.data)
  const metadata = useSelector(
    (state: AppState) => state.createDao.data.metadata,
  )
  const pdb = usePDB()
  const history = useHistory()
  const {
    wallet: { address: myWallet },
  } = useWallet()

  const createVotingMint = useCallback(async () => {
    const { members } = metadata
    const multiSigWallet = new MultisigWallet(DEFAULT_EMPTY_ADDRESS)
    const mintAddress = await multiSigWallet.createNewTokenAndMintTo(
      members.length,
    )
    return mintAddress.toBase58()
  }, [metadata])

  const getDistributorAddress = useCallback(
    async (mintAddress: string) => {
      const { members, daoType } = metadata
      if (daoType === 'flexible-dao') return ''
      const distributor = new Distributor()
      const pubKeys = members
        .filter(({ walletAddress }) => walletAddress !== myWallet)
        .map(({ walletAddress }) => account.fromAddress(walletAddress))

      const distributorAddress = await distributor.createDistributor(
        pubKeys,
        mintAddress,
      )
      return distributorAddress
    },
    [metadata, myWallet],
  )

  const createMultisigDao = useCallback(async () => {
    try {
      setLoading(true)
      const { regime, isPublic, isNft } = createDaoData
      const mintAddress = await createVotingMint()
      const distributorAddress = await getDistributorAddress(mintAddress)
      const ipfs = new IPFS()
      const cid = await ipfs.set({ ...metadata, distributorAddress })
      const {
        multihash: { digest },
      } = CID.parse(cid)
      const metadataBuff = Buffer.from(digest)
      const { members } = metadata
      const totalSupply = new BN(members.length)
      const { txId, daoAddress } = await interDao.initializeDao(
        mintAddress,
        totalSupply,
        metadataBuff,
        undefined, // Optional DAO's keypair
        regime,
        isNft,
        isPublic,
      )

      await pdb.setItem(daoAddress, {
        ...metadata,
        distributorAddress,
        cid,
      }) // to realtime
      window.notify({
        type: 'success',
        description: 'A new DAO is created. Click here to view details.',
        onClick: () => window.open(explorer(txId), '_blank'),
      })
      return history.push(`/app/${appId}/dao/${daoAddress}`)
    } catch (er: any) {
      window.notify({ type: 'error', description: er.message })
    } finally {
      setLoading(false)
    }
  }, [
    createDaoData,
    createVotingMint,
    getDistributorAddress,
    metadata,
    pdb,
    history,
  ])

  return { createMultisigDao, loading }
}

export default useMultisigDao
