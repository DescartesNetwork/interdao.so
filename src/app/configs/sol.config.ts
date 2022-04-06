import InterDAO from '@interdao/core'
import SafeWallet from 'app/helpers/safeWallet'
import { Net } from 'shared/runtime'

/**
 * Contructor
 */
type Conf = {
  rpc: string
  interDao: InterDAO
}

const conf: Record<Net, Conf> = {
  /**
   * Development configurations
   */
  devnet: {
    rpc: 'https://api.devnet.solana.com',
    interDao: new InterDAO(new SafeWallet()),
  },

  /**
   * Staging configurations
   */
  testnet: {
    rpc: 'https://api.testnet.solana.com',
    interDao: new InterDAO(new SafeWallet()),
  },

  /**
   * Production configurations
   */
  mainnet: {
    rpc: 'https://ssc-dao.genesysgo.net',
    interDao: new InterDAO(new SafeWallet()),
  },
}

/**
 * Module exports
 */
export default conf
