import { Skeleton } from 'antd'
import { lazy, Suspense } from 'react'
import { TemplateNames } from './index'

type PropsTemplateLoader = { name: TemplateNames; daoAddress: string }
export const TemplateLoaderCreate = ({
  name,
  daoAddress,
}: PropsTemplateLoader) => {
  const Component = lazy(() => import(`./${name}/create`))
  return (
    <Suspense fallback={<Skeleton active />}>
      <Component daoAddress={daoAddress} />
    </Suspense>
  )
}
