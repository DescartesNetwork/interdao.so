import { ComponentConfigs } from '../components/templateForm'

// Config
export enum TemplateNames {
  'SplTransfer' = 'spl-transfer',
  'SplApprove' = 'spl-approve',
  'BlankTemplate' = 'blank',
  'ZetaDeposit' = 'zeta-deposit',
  'ZetaCreate' = 'zeta-create',
  'SenFarmingStake' = 'sen-farming-stake',
  'EmbeddedView' = 'embedded-view',
}

export type TemplateConfig<T extends string> = {
  name: TemplateNames
  title: string
  components: ComponentConfigs<T>[]
}

// Component Type
export type PropsCreateComponent<T> = {
  daoAddress: string
  defaultData?: T
}

export type TemplateAccount = {
  name: string
  isMut: boolean
  isSigner: boolean
  isMaster: boolean
}
