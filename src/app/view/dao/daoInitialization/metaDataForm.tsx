import { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Col, Input, Row, Space, Typography, Upload } from 'antd'
import IonIcon from 'shared/antd/ionicon'

import { UploadChangeParam } from 'antd/lib/upload'
import { fileToBase64 } from 'app/helpers'
import {
  MetaData,
  setCreateDaoMetaData,
  SOCIAL_MEDIA,
} from 'app/model/metadata.controller'
import { AppDispatch, AppState } from 'app/model'

const MetaDataForm = () => {
  const {
    metadata: { createMetaData },
  } = useSelector((state: AppState) => state)
  const dispatch = useDispatch<AppDispatch>()

  const formatMetaData = async (imgBase64: string | ArrayBuffer | null) => {
    const nextMetaData: MetaData = {
      ...createMetaData,
      image: imgBase64,
    }
    return dispatch(setCreateDaoMetaData(nextMetaData))
  }

  const onFileChange = (file: UploadChangeParam) => {
    const { fileList } = file
    const originFile = fileList[0].originFileObj as File
    fileToBase64(originFile, formatMetaData)
  }

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    dispatch(
      setCreateDaoMetaData({
        ...createMetaData,
        [e.target.name]: e.target.value,
      }),
    )

  const onOptionalChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    idx: number,
  ) => {
    const nextMetaData: MetaData = JSON.parse(JSON.stringify(createMetaData))
    nextMetaData.optionals.splice(idx, 1, e.target.value)
    dispatch(setCreateDaoMetaData(nextMetaData))
  }

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Typography.Text>Dao name</Typography.Text>
          <Input
            value={createMetaData.daoName}
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
            value={createMetaData.description}
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
              value={createMetaData.optionals[idx]}
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
