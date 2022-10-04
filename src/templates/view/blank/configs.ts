import { ComponentConfigs } from 'templates/components/templateForm'
import { TemplateConfig, TemplateNames } from '../../constant'

export type IDS = ''
export const COMPONENT_CONFIGS: ComponentConfigs<IDS>[] = []

export const TEMPLATE_CONFIGS: TemplateConfig<IDS> = {
  name: TemplateNames.BlankTemplate,
  title: 'Blank',
  components: COMPONENT_CONFIGS,
}
