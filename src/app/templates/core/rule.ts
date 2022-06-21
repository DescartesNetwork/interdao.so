import { utils, web3 } from '@project-serum/anchor'

export type RulesName = 'token-account'
export type RulesData = {
  'token-account': { mint: string; owner: string }
}
export const TemplateRule = {
  'token-account': {
    call: async (data: RulesData['token-account']) => {
      return utils.token.associatedAddress({
        mint: new web3.PublicKey(data.mint),
        owner: new web3.PublicKey(data.owner),
      })
    },
  },
}
