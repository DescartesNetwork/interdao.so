import { ComponentConfigs } from 'templates/components/templateForm'
import { TemplateConfig, TemplateNames } from '../../constant'

export type IDS = 'amount' | 'sender' | 'mint' | 'receiver'
export const COMPONENT_CONFIGS: ComponentConfigs<IDS>[] = [
  {
    title: 'Transfer Amount',
    type: 'number',
    id: 'amount',
    prefix: {
      id: 'mint',
      type: 'mint-select',
    },
  },
  {
    title: "Sender's Wallet Address",
    type: 'address',
    id: 'sender',
    disabled: true,
  },
  {
    title: "Receiver's Wallet Address",
    type: 'address',
    id: 'receiver',
  },
]

export const TEMPLATE_CONFIGS: TemplateConfig<IDS> = {
  name: TemplateNames.SplTransfer,
  title: 'SPL/Transfer',
  components: COMPONENT_CONFIGS,
}
