import {
  ComponentConfigs,
  TemplateData,
} from 'templates/components/templateForm'
import { TemplateConfig, TemplateNames } from '../../constant'

export type IDS = 'title' | 'url' | 'logo' | 'appId'
export const COMPONENT_CONFIGS: ComponentConfigs<IDS>[] = []

export const TEMPLATE_CONFIGS: TemplateConfig<IDS> = {
  name: TemplateNames.EmbeddedView,
  title: 'EmbeddedView',
  components: COMPONENT_CONFIGS,
}

export type EmbeddedViewData = TemplateData<IDS>
