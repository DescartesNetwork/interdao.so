import { RulesData, RulesName } from './core/rule'
import { SplTransferIdl } from './spl-transfer/configs'

export type TemplateIdl = {
  name: string
  accounts: (TemplateAccount | TemplateAccountWithRule)[]
  args: TemplateArg[]
  programId: string
}

export type TemplateAccount = {
  name: string
  isMut: boolean
  isSigner: boolean
  isMaster: boolean
}
export type TemplateAccountWithRule = {
  name: string
  isMut: boolean
  isSigner: boolean
  isMaster: boolean
  rule: {
    name: RulesName
    configs: RulesData[TemplateAccountWithRule['rule']['name']]
  }
}
export const isTemplateAccountWithRule = (
  idlAccount: TemplateAccount | TemplateAccountWithRule,
): idlAccount is TemplateAccountWithRule => {
  // @ts-ignore
  return idlAccount.rule !== undefined
}

export type TemplateArg = {
  name: string
  type: 'u8' | 'u64'
}

// Config
export const Templates: Record<string, TemplateIdl> = {
  spl_transfer: SplTransferIdl,
}
