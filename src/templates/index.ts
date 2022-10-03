import { ComponentConfigs } from './components/templateForm'
import { RulesData, RulesName } from './core/rule'

// Config
export enum TemplateNames {
  'SplTransfer' = 'spl-transfer',
  'SplApprove' = 'spl-approve',
  'BlankTemplate' = 'blank',
  'ZetaDeposit' = 'zeta-deposit',
  'ZetaCreate' = 'zeta-create',
}

export type TemplateConfig<T extends string> = {
  name: TemplateNames
  components: ComponentConfigs<T>[]
}

// Component Type
export type PropsCreateComponent = {
  daoAddress: string
}
// System type
export type TemplateIdl = {
  name: TemplateNames
  instructions: {
    ixName: string
    anchor: boolean
    accounts: (TemplateAccount | TemplateAccountWithRule)[]
    args: (TemplateArg | TemplateArgWithRule)[]
    programId: string
  }[]
}

export type TemplateAccount = {
  name: string
  isMut: boolean
  isSigner: boolean
  isMaster: boolean
}
export type TemplateAccountWithRule = TemplateAccount & {
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
  type: 'u8' | 'u64' | 'u32'
}
export type TemplateArgWithRule = TemplateArg & {
  rule: {
    name: RulesName
    configs: RulesData[TemplateAccountWithRule['rule']['name']]
  }
}
export const isTemplateArgWithRule = (
  idlArg: TemplateArg | TemplateArgWithRule,
): idlArg is TemplateArgWithRule => {
  // @ts-ignore
  return idlArg.rule !== undefined
}
