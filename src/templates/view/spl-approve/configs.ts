import { ComponentConfigs } from 'templates/components/templateForm'
import { TemplateConfig, TemplateNames } from './../../index'

export type IDS = 'viewAmount' | 'viewSource' | 'viewMint' | 'viewDelegate'
export const COMPONENT_CONFIGS: ComponentConfigs<IDS>[] = [
  {
    id: 'viewAmount',
    type: 'number',
    title: 'Source',
    prefix: {
      id: 'viewMint',
      type: 'mint-select',
      title: 'Source',
    },
  },
  {
    id: 'viewSource',
    type: 'address',
    title: 'Source',
  },
  {
    id: 'viewDelegate',
    type: 'address',
    title: 'Delegate',
  },
]

export const TEMPLATE_CONFIGS: TemplateConfig<IDS> = {
  name: TemplateNames.SplApprove,
  components: COMPONENT_CONFIGS,
}
