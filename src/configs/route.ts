import configs from 'configs'
import { ExtractRouteParams } from 'react-router'
import { generatePath as generatePathRaw } from 'react-router-dom'

// DAO
import ListDaos from '../view/listDaos'
import CreateDao from '../view/createDao'
import EditDao from '../view/editDao'
import DaoDetails from '../view/daoDetails'
// Proposal
import CreateProposal from '../view/createProposal'
import ProposalDetails from '../view/proposalDetails'
// Not found
import PageNotFound from 'view/pageNotFound'

const {
  manifest: { appId },
} = configs

const LIST_DAOS = `/dao`

const CREATE_DAO = `/dao/create-dao`
const EDIT_DAO = `/dao/:daoAddress/edit`
const DAO_DETAILS = `/dao/:daoAddress`

const CREATE_PROPOSAL = `/create-proposal`
const PROPOSAL_DETAILS = `/proposal/:proposalAddress`

const NOT_FOUND = `/page-not-found`

function wrapAppRoute(path: string) {
  return `/app/${appId}${path}`
}

export const APP_ROUTE = {
  listDaos: {
    path: wrapAppRoute(LIST_DAOS),
    generatePath: (data: ExtractRouteParams<typeof LIST_DAOS>) =>
      generatePathRaw(wrapAppRoute(LIST_DAOS), data),
    component: ListDaos,
  },
  createDao: {
    path: wrapAppRoute(CREATE_DAO),
    generatePath: (data: ExtractRouteParams<typeof CREATE_DAO>) =>
      generatePathRaw(wrapAppRoute(CREATE_DAO), data),
    component: CreateDao,
  },
  editDao: {
    path: wrapAppRoute(EDIT_DAO),
    generatePath: (data: ExtractRouteParams<typeof EDIT_DAO>) =>
      generatePathRaw(wrapAppRoute(EDIT_DAO), data),
    component: EditDao,
  },
  daoDetails: {
    path: wrapAppRoute(DAO_DETAILS),
    generatePath: (data: ExtractRouteParams<typeof DAO_DETAILS>) =>
      generatePathRaw(wrapAppRoute(DAO_DETAILS), data),
    component: DaoDetails,
  },
  createProposal: {
    path: wrapAppRoute(CREATE_PROPOSAL),
    generatePath: (data: ExtractRouteParams<typeof CREATE_PROPOSAL>) =>
      generatePathRaw(wrapAppRoute(CREATE_PROPOSAL), data),
    component: CreateProposal,
  },
  proposalDetails: {
    path: wrapAppRoute(PROPOSAL_DETAILS),
    generatePath: (data: ExtractRouteParams<typeof PROPOSAL_DETAILS>) =>
      generatePathRaw(wrapAppRoute(PROPOSAL_DETAILS), data),
    component: ProposalDetails,
  },
  notFound: {
    path: wrapAppRoute(NOT_FOUND),
    generatePath: (data: ExtractRouteParams<typeof NOT_FOUND>) =>
      generatePathRaw(wrapAppRoute(NOT_FOUND), data),
    component: PageNotFound,
  },
}
