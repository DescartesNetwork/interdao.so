import { Provider } from 'react-redux'
import {
  WalletProvider,
  UIProvider,
  AccountProvider,
  PoolProvider,
  MintProvider,
} from '@sentre/senhub'

import View from 'view'
import model from 'model'
import configs from 'configs'

const {
  manifest: { appId },
} = configs

export const Page = () => {
  return (
    <UIProvider appId={appId} antd={{ prefixCls: appId }}>
      <WalletProvider>
        <AccountProvider>
          <PoolProvider>
            <MintProvider>
              <Provider store={model}>
                <View />
              </Provider>
            </MintProvider>
          </PoolProvider>
        </AccountProvider>
      </WalletProvider>
    </UIProvider>
  )
}

export * from 'static.app'
