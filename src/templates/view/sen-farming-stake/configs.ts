import { Net } from '@sentre/senhub'
import { ComponentConfigs } from 'templates/components/templateForm'
import { TemplateConfig, TemplateNames } from '../../constant'

export type IDS = 'amount' | 'farm' | 'mint'
export const COMPONENT_CONFIGS: ComponentConfigs<IDS>[] = [
  {
    title: 'Farm Address',
    type: 'address',
    id: 'farm',
  },
  {
    title: 'Amount',
    type: 'number',
    id: 'amount',
    prefix: {
      id: 'mint',
      type: 'mint-select',
      disabled: true,
    },
  },
]

export const TEMPLATE_CONFIGS: TemplateConfig<IDS> = {
  name: TemplateNames.SenFarmingStake,
  title: 'Sen/Farming Stake',
  components: COMPONENT_CONFIGS,
}

type Conf = {
  senFarmingProgram: string
}
export const conf: Record<Net, Conf> = {
  /**
   * Development configurations
   */
  devnet: {
    senFarmingProgram: '6LaxnmWdYUAJvBJ4a1R8rrsvCRtaY7b43zKiNAU2k3Nx',
  },

  /**
   * Staging configurations
   */
  testnet: {
    senFarmingProgram: '6LaxnmWdYUAJvBJ4a1R8rrsvCRtaY7b43zKiNAU2k3Nx',
  },

  /**
   * Production configurations
   */
  mainnet: {
    senFarmingProgram: 'E6Vc9wipgm8fMXHEYwgN7gYdDbyvpPBUiTNy67zPKuF4',
  },
}
