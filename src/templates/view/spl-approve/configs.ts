import { ComponentConfigs } from 'templates/components/templateForm'
import { TemplateConfig, TemplateNames } from './../../index'

export type IDS = 'viewAmount' | 'viewSource' | 'viewMint' | 'viewDelegate'
export const COMPONENT_CONFIGS: ComponentConfigs<IDS>[] = [
  {
    id: 'viewAmount',
    type: 'number',
    title: 'Amount',
    prefix: {
      id: 'viewMint',
      type: 'mint-select',
    },
  },
  {
    id: 'viewSource',
    type: 'address',
    title: 'Source',
    disabled: true,
  },
  {
    id: 'viewDelegate',
    type: 'address',
    title: 'Delegate',
  },
]

export const TEMPLATE_CONFIGS: TemplateConfig<IDS> = {
  name: TemplateNames.SplApprove,
  title: 'SPL/Approve',
  components: COMPONENT_CONFIGS,
}
