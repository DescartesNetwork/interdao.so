import { IPFS } from '@sen-use/web3'
import { CommentProposal } from 'model/comments.controller'
import { MetaData } from 'model/createDao.controller'
import { ProposalMetaData } from 'view/proposal/proposalInitialization'

const KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDg4MzdCZUI2ODM5MTcwODZjQUI3OTU0MzI3ZTgwOWU1ZTlCZTc2NTEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTU0NTU5NzI5MjAsIm5hbWUiOiJTZW50cmUifQ.Jf7oQOKMrBxp5morvs7DR_As4EU9Y5WybyuvY1teFN8'

type MapTypes = {
  daoMetadata: MetaData // Dao
  proposalMetaData: ProposalMetaData
  proposalComments: CommentProposal[]
}
type Idl = ['daoMetadata', 'proposalMetaData', 'proposalComments']
const IDL: Idl = ['daoMetadata', 'proposalMetaData', 'proposalComments']

export const ipfs = new IPFS<MapTypes, Idl>(KEY, IDL)
