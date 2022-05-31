import axios from 'axios'
import { Connection, programs } from '@metaplex/js'
import { PublicKey } from '@solana/web3.js'
import { net } from 'shared/runtime'

const {
  metadata: { Metadata, MetadataData },
} = programs

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
  const metadataPDA = await Metadata.getPDA(new PublicKey(tokenMint))
  const tokenMetadata = await Metadata.load(connection, metadataPDA)
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
