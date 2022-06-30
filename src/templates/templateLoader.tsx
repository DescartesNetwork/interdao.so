import { Component, ErrorInfo, lazy, ReactNode, Suspense } from 'react'

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
    <ErrorBoundary>
      <Suspense fallback={<div />}>
        <Component daoAddress={daoAddress} />
      </Suspense>
    </ErrorBoundary>
  )
}

export type PropsTemplateProposalLoader = { proposalAddress: string }
export const TemplateProposalLoader = ({
  proposalAddress,
}: PropsTemplateProposalLoader) => {
  const template = useTemplateWithProposal(proposalAddress)
  const Component = lazy(() => import(`./${template}/proposal`))
  return (
    <ErrorBoundary>
      <Suspense fallback={<div />}>
        <Component proposalAddress={proposalAddress} />
      </Suspense>
    </ErrorBoundary>
  )
}

export type PropsTemplateInfoLoader = { proposalAddress: string }
export const TemplateInfoLoader = ({
  proposalAddress,
}: PropsTemplateInfoLoader) => {
  const template = useTemplateWithProposal(proposalAddress)
  const Component = lazy(() => import(`./${template}/info`))
  return (
    <ErrorBoundary>
      <Suspense fallback={<div />}>
        <Component proposalAddress={proposalAddress} />
      </Suspense>
    </ErrorBoundary>
  )
}

interface Props {
  children?: ReactNode
}
interface State {
  hasError: boolean
}
class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return <h1>Sorry.. there was an error</h1>
    }

    return this.props.children
  }
}

export default ErrorBoundary
