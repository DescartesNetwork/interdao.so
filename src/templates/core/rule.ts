import { utils, web3 } from '@project-serum/anchor'
import util from '@senswap/sen-js/dist/utils'

export enum RulesName {
  'tokenAccount' = 'token-account',
  'decimalize' = 'decimalize',
}

export type RulesData = {
  [RulesName.tokenAccount]: { mint: string; owner: string }
  [RulesName.decimalize]: { mint: string; amount: string }
}
export const TEMPLATE_RULES = {
  [RulesName.tokenAccount]: {
    call: async (data: RulesData[RulesName.tokenAccount]) => {
      return utils.token.associatedAddress({
        mint: new web3.PublicKey(data.mint),
        owner: new web3.PublicKey(data.owner),
      })
    },
  },
  [RulesName.decimalize]: {
    call: async (data: RulesData[RulesName.decimalize]) => {
      const { splt } = window.sentre
      const mintData = await splt.getMintData(data.mint)
      return util.decimalize(data.amount, mintData.decimals)
    },
  },
}
