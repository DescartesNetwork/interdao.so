import { useCallback, useMemo } from 'react'

import { Col, Row, Space, Typography } from 'antd'
import AddressInput from './addressInput'
import NumberInput from './numberInput'
import MintInput from './mintInput'

export type ComponentConfigs<T extends string> = {
  id: T
  type: 'number' | 'address' | 'mint-select'
  title?: string
  prefix?: ComponentConfigs<T>
}
export type RenderComponentProps = {
  templateData: Record<string, string>
  configs: ComponentConfigs<keyof RenderComponentProps['templateData']>
  onChange: (keidy: string, value: string) => void
}

export type TemplateData<T extends string> = Record<T, string>

export type TemplateFormProps = {
  components: ComponentConfigs<any>[]
  templateData: Record<string, string>
  onChange: (templateData: any) => void
}

const RenderComponent = ({
  configs,
  templateData,
  onChange,
}: RenderComponentProps) => {
  const { id, prefix, type } = configs

  const value = templateData[id]

  const prefixComponent = useMemo(() => {
    if (!prefix) return
    return (
      <RenderComponent
        configs={prefix}
        onChange={onChange}
        templateData={templateData}
      />
    )
  }, [onChange, prefix, templateData])

  const componentProps = useMemo(() => {
    return {
      handleChange: onChange,
      prefix: prefixComponent,
      id,
      value,
    }
  }, [id, onChange, prefixComponent, value])

  if (type === 'number') return <NumberInput {...componentProps} />
  if (type === 'mint-select') return <MintInput {...componentProps} />
  if (type === 'address') return <AddressInput {...componentProps} />
  return null
}

const TemplateForm = ({
  onChange,
  components,
  templateData,
}: TemplateFormProps) => {
  const onChangeComponent = useCallback(
    (id: string, value: string) => {
      onChange({ ...templateData, [id]: value })
    },
    [onChange, templateData],
  )

  return (
    <Row gutter={[24, 24]}>
      {components.map((configs) => {
        return (
          <Col span={24} key={configs.id}>
            <Space direction="vertical" size={4} style={{ width: '100%' }}>
              {configs.title && (
                <Typography.Text type="secondary">
                  {configs.title}
                </Typography.Text>
              )}
              <RenderComponent
                configs={configs}
                onChange={onChangeComponent}
                templateData={templateData}
              />
            </Space>
          </Col>
        )
      })}
    </Row>
  )
}

export default TemplateForm
