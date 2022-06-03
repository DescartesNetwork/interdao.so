import axios from 'axios'
import { Connection, programs } from '@metaplex/js'
import { PublicKey } from '@solana/web3.js'

import { net } from 'shared/runtime'

const {
  metadata: { Metadata, MetadataData },
} = programs

const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
  'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
)

const connection = new Connection(net)

export type MetadataType = InstanceType<typeof Metadata>
export type MetadataDataType = InstanceType<typeof MetadataData>

export const fetchListNTFs = async (
  walletAddress: string,
): Promise<Record<string, MetadataDataType[]>> => {
  const ownerPublickey = walletAddress
  const nftsmetadata = await Metadata.findDataByOwner(
    connection,
    ownerPublickey,
  )
  let listNFTs: Record<string, MetadataDataType[]> = {}
  nftsmetadata.forEach((nft: MetadataDataType) => {
    if (nft.collection) {
      listNFTs[nft.collection.key] = listNFTs[nft.collection.key]
        ? [...listNFTs[nft.collection.key], nft]
        : [nft]
    }
  })
  return listNFTs
}

export const fetchYourOwnerNTFs = async (
  ownerAddress: string,
): Promise<MetadataDataType[]> => {
  const nftsmetadata = await Metadata.findDataByOwner(connection, ownerAddress)
  return nftsmetadata
}

export const getNftMetaData = async (
  tokenMint: string,
): Promise<MetadataType> => {
  const tokenMetadata = await Metadata.findByMint(connection, tokenMint)
  return tokenMetadata
}

export const getNftPDA = async (tokenMint: string) => {
  const metadataPDA = await Metadata.getPDA(new PublicKey(tokenMint))
  return metadataPDA
}

export const getInfoNFT = async (address: string) => {
  const nftInfo = await Metadata.getInfo(connection, new PublicKey(address))
  return nftInfo
}

export const deserializeData = async (dataBuffer: Buffer) => {
  return MetadataData.deserialize(dataBuffer)
}

export const fetchNftFromURI = async (URL: string) => {
  const data = await axios.get(URL)
  return data
}

export const getListAccountNFTsBelongToCollection = async (
  collectionAddress: string,
) => {
  const accounts = await connection.getProgramAccounts(
    TOKEN_METADATA_PROGRAM_ID,
    {
      commitment: 'confirmed',
      filters: [
        { dataSize: 679 },
        {
          memcmp: {
            offset: 368,
            bytes: collectionAddress,
          },
        },
      ],
    },
  )
  return accounts
}

export const isNftBelongsToCollection = async (
  mintNftAddress: string,
  collectionAddress: string,
) => {
  try {
    const tokenMetadata = await Metadata.findByMint(connection, mintNftAddress)
    if (tokenMetadata.data.collection?.key === collectionAddress) return true
    return false
  } catch (err: any) {
    return false
  }
}
