import configs from 'configs'
import { ExtractRouteParams } from 'react-router'
import { generatePath as generatePathRaw } from 'react-router-dom'

const {
  manifest: { appId },
} = configs

const LIST_DAOS = `/app/${appId}/dao`

const CREATE_DAO = `/app/${appId}/dao/create-dao`
const EDIT_DAO = `/app/${appId}/dao/:daoAddress/edit`
const DAO_DETAILS = `/app/${appId}/dao/:daoAddress`

const CREATE_PROPOSAL = `/app/${appId}/create-proposal`
const PROPOSAL_DETAILS = `/app/${appId}/create-proposal`

const NOT_FOUND = `/app/${appId}/page-not-found`

export const APP_ROUTE = {
  listDaos: {
    path: LIST_DAOS,
    generatePath: (data: ExtractRouteParams<typeof LIST_DAOS>) =>
      generatePathRaw(LIST_DAOS, data),
  },
  createDao: {
    path: CREATE_DAO,
    generatePath: (data: ExtractRouteParams<typeof CREATE_DAO>) =>
      generatePathRaw(CREATE_DAO, data),
  },
  editDao: {
    path: EDIT_DAO,
    generatePath: (data: ExtractRouteParams<typeof EDIT_DAO>) =>
      generatePathRaw(EDIT_DAO, data),
  },
  daoDetails: {
    path: DAO_DETAILS,
    generatePath: (data: ExtractRouteParams<typeof DAO_DETAILS>) =>
      generatePathRaw(DAO_DETAILS, data),
  },
  createProposal: {
    path: CREATE_PROPOSAL,
    generatePath: (data: ExtractRouteParams<typeof CREATE_PROPOSAL>) =>
      generatePathRaw(CREATE_PROPOSAL, data),
  },
  proposalDetails: {
    path: PROPOSAL_DETAILS,
    generatePath: (data: ExtractRouteParams<typeof PROPOSAL_DETAILS>) =>
      generatePathRaw(PROPOSAL_DETAILS, data),
  },
  notFound: {
    path: NOT_FOUND,
    generatePath: (data: ExtractRouteParams<typeof NOT_FOUND>) =>
      generatePathRaw(NOT_FOUND, data),
  },
}
