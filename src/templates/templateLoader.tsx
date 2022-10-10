import { Alert, Card, Spin, Tabs } from 'antd'
import { lazy, Suspense } from 'react'

import { useTemplateWithProposal } from './hooks/useTemplateWithProposal'
import { TemplateNames } from './constant/index'
import useProposalMetaData from 'hooks/proposal/useProposalMetaData'
import { ProposalExplorer } from './components/proposalExplorer'

export type PropsTemplateCreateLoader = {
  name: TemplateNames
  daoAddress: string
  defaultData?: Record<string, string>
}
export const TemplateCreateLoader = ({
  name,
  daoAddress,
  defaultData,
}: PropsTemplateCreateLoader) => {
  const Component = lazy(() => import(`./view/${name}/create`))
  return (
    <Alert.ErrorBoundary description="Can't not load template!">
      <Suspense fallback={<div />}>
        <Component daoAddress={daoAddress} defaultData={defaultData} />
      </Suspense>
    </Alert.ErrorBoundary>
  )
}

export type PropsTemplateProposalLoader = { proposalAddress: string }
export const TemplateProposalLoader = ({
  proposalAddress,
}: PropsTemplateProposalLoader) => {
  const template = useTemplateWithProposal(proposalAddress)
  const Component = lazy(() => import(`./view/${template}/proposal`))

  if (!template)
    return (
      <Spin spinning tip="Loading...">
        <Card
          bordered={false}
          className="proposal-card"
          bodyStyle={{ padding: '24px 12px 0 0', minHeight: 150 }}
          hoverable
        />
      </Spin>
    )
  return (
    <Alert.ErrorBoundary>
      <Suspense fallback={<div />}>
        <Component proposalAddress={proposalAddress} />
      </Suspense>
    </Alert.ErrorBoundary>
  )
}

export type PropsTemplateInfoLoader = { proposalAddress: string }

export const TemplateInfoLoader = ({
  proposalAddress,
}: PropsTemplateInfoLoader) => {
  const { metaData } = useProposalMetaData(proposalAddress)

  if (!metaData) return null

  const { templateConfig } = metaData
  const Component = lazy(() => import(`./view/${templateConfig.name}/info`))
  return (
    <Alert.ErrorBoundary>
      <Suspense fallback={<div />}>
        <Tabs
          style={{ marginTop: -12 }}
          items={[
            {
              label: 'Template Data',
              key: 'template-data',
              children: <Component proposalAddress={proposalAddress} />,
            },
            {
              label: 'Proposal Explorer',
              key: 'proposal-explorer',
              children: <ProposalExplorer proposalAddress={proposalAddress} />,
            },
          ]}
        />
      </Suspense>
    </Alert.ErrorBoundary>
  )
}
