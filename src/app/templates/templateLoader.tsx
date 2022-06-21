import { lazy, Suspense } from 'react'

import { Skeleton } from 'antd'

import { useTemplateWithProposal } from './hooks/useTemplateWithProposal'
import { TemplateNames } from './index'

export type PropsTemplateCreateLoader = {
  name: TemplateNames
  daoAddress: string
}
export const TemplateCreateLoader = ({
  name,
  daoAddress,
}: PropsTemplateCreateLoader) => {
  const Component = lazy(() => import(`./${name}/create`))
  return (
    <Suspense fallback={<Skeleton active />}>
      <Component daoAddress={daoAddress} />
    </Suspense>
  )
}

export type PropsTemplateProposalLoader = { proposalAddress: string }
export const TemplateProposalLoader = ({
  proposalAddress,
}: PropsTemplateProposalLoader) => {
  const template = useTemplateWithProposal(proposalAddress)
  const Component = lazy(() => import(`./${template}/proposal`))
  return (
    <Suspense fallback={<Skeleton active />}>
      <Component proposalAddress={proposalAddress} />
    </Suspense>
  )
}
