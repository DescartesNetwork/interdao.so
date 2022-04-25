import { ChangeEvent } from 'react'

import { Col, Input, Row, Space, Typography, Upload } from 'antd'
import IonIcon from 'shared/antd/ionicon'

import { UploadChangeParam } from 'antd/lib/upload'
import { fileToBase64 } from 'app/helpers'

export type MetaData = {
  daoName: string
  description: string
  image: string | ArrayBuffer | null
  optionals: string[]
}

type MetaDataFormProps = {
  metaData: MetaData
  setMetaData: (data: MetaData) => void
}
const SOCIAL_MEDIA = ['twitter', 'discord']

const MetaDataForm = ({ metaData, setMetaData }: MetaDataFormProps) => {
  const formatMetaData = async (imgBase64: string | ArrayBuffer | null) => {
    const nextMetaData: MetaData = {
      ...metaData,
      image: imgBase64,
    }
    setMetaData(nextMetaData)
  }

  const onFileChange = (file: UploadChangeParam) => {
    const { fileList } = file
    const originFile = fileList[0].originFileObj as File
    fileToBase64(originFile, formatMetaData)
  }

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setMetaData({ ...metaData, [e.target.name]: e.target.value })

  const onOptionalChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    idx: number,
  ) => {
    const nextMetaData: MetaData = JSON.parse(JSON.stringify(metaData))
    nextMetaData.optionals.splice(idx, 1, e.target.value)
    setMetaData(nextMetaData)
  }

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Typography.Text>Dao name</Typography.Text>
          <Input
            value={metaData.daoName}
            onChange={onChange}
            name="daoName"
            className="border-less"
          />
        </Space>
      </Col>
      <Col span={24}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Typography.Text>Dao description</Typography.Text>
          <Input.TextArea
            value={metaData.description}
            name="description"
            onChange={onChange}
            className="border-less"
          />
        </Space>
      </Col>
      <Col span={24}>
        <Space direction="vertical">
          <Typography.Text>Avatar</Typography.Text>
          <Upload
            name="avatar"
            listType="picture-card"
            maxCount={1}
            showUploadList
            onChange={onFileChange}
          >
            <IonIcon name="add-outline" />
          </Upload>
        </Space>
      </Col>
      {SOCIAL_MEDIA.map((social, idx) => (
        <Col span={24} key={idx}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Typography.Text style={{ textTransform: 'capitalize' }}>
              {social}
            </Typography.Text>
            <Input
              value={metaData.optionals[idx]}
              onChange={(e) => onOptionalChange(e, idx)}
              name="optionals"
              className="border-less"
            />
          </Space>
        </Col>
      ))}
    </Row>
  )
}

export default MetaDataForm
