import { Net } from '@sentre/senhub'

/**
 * Contructor
 */
type Conf = {
  interDaoProgramId: string
  fee: number
  taxman: string
  taxmanAddress: string
}

const conf: Record<Net, Conf> = {
  /**
   * Development configurations
   */
  devnet: {
    interDaoProgramId: '969SsCCV9rQUMwPDHKEVh8Gq8YLdBrh2TT9WnfPg9R16',
    fee: 1000000, // 0.001 SOL
    taxman: '8W6QginLcAydYyMYjxuyKQN56NzeakDE3aRFrAmocS6D',
    taxmanAddress: '8UaZw2jDhJzv5V53569JbCd3bD4BnyCfBH3sjwgajGS9',
  },

  /**
   * Staging configurations
   */
  testnet: {
    interDaoProgramId: '',
    fee: 1000000, // 0.001 SOL
    taxman: '8W6QginLcAydYyMYjxuyKQN56NzeakDE3aRFrAmocS6D',
    taxmanAddress: '',
  },

  /**
   * Production configurations
   */
  mainnet: {
    interDaoProgramId: 'Cf9aesANCGv35NsqtGpJ4d3M7wKrcPLiGDLUxYPtaEab',
    fee: 1000000, // 0.001 SOL
    taxman: '8W6QginLcAydYyMYjxuyKQN56NzeakDE3aRFrAmocS6D',
    taxmanAddress: '9doo2HZQEmh2NgfT3Yx12M89aoBheycYqH1eaR5gKb3e',
  },
}

/**
 * Module exports
 */
export default conf
