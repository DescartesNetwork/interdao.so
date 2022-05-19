import React, { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Card, Col, Image, Input, Row, Space, Typography, Upload } from 'antd'
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
    dispatch(setCreateDaoMetaData({ [e.target.name]: e.target.value }))
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
          <Typography.Text>DAO name</Typography.Text>
          <Input
            value={createMetaData.daoName}
            placeholder="Input DAO name"
            onChange={onChange}
            name="daoName"
            className="border-less"
          />
        </Space>
      </Col>
      <Col span={24}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Typography.Text>DAO description</Typography.Text>
          <Input.TextArea
            value={createMetaData.description}
            placeholder="Input DAO description"
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
            className={`interdao-upload-metadata ${
              !!createMetaData.image ? 'uploaded' : ''
            }`}
            accept="image/png,image/jpg,image/webp"
            name="avatar"
            listType="picture-card"
            maxCount={1}
            onChange={onFileChange}
            itemRender={(eml, uploadFile, uploadFiles, { remove }) => {
              return (
                <Card
                  className="img-card-preview-upload"
                  bodyStyle={{ padding: 0, position: 'relative' }}
                >
                  <Image src={uploadFile.thumbUrl} preview={false} />
                  <IonIcon
                    className="ico-action-upload"
                    name="trash-outline"
                    onClick={remove}
                  />
                </Card>
              )
            }}
            onRemove={() => {
              dispatch(setCreateDaoMetaData({ image: '' }))
              return true
            }}
          >
            <Space direction="vertical" size={0}>
              <Typography.Text style={{ fontSize: 24 }}>
                <IonIcon name="cloud-upload-outline" />
              </Typography.Text>
              <Typography.Text type="secondary" style={{ fontSize: 10 }}>
                Support JPG, PNG
              </Typography.Text>
            </Space>
          </Upload>
        </Space>
      </Col>
      {SOCIAL_MEDIA.map((social, idx) => (
        <Col xs={24} md={12} key={idx}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Typography.Text style={{ textTransform: 'capitalize' }}>
              {social} (Optional)
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
