import { Provider } from 'react-redux'
import { AntdProvider } from '@sentre/senhub'

import View from 'view'
import { AppLoader } from 'view/appLoader'

import model from 'model'
import configs from 'configs'

const {
  manifest: { appId },
} = configs

export const Page = () => {
  return (
    <AntdProvider appId={appId} prefixCls={appId}>
      <Provider store={model}>
        <AppLoader>
          <View />
        </AppLoader>
      </Provider>
    </AntdProvider>
  )
}

export * from 'static.app'
