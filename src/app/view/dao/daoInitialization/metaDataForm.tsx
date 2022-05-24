import { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  Button,
  Card,
  Col,
  Image,
  Input,
  Row,
  Space,
  Typography,
  Upload,
} from 'antd'
import IonIcon from 'shared/antd/ionicon'

import { UploadChangeParam } from 'antd/lib/upload'
import { fileToBase64 } from 'app/helpers'
import { MetaData, setCreateDaoMetaData } from 'app/model/metadata.controller'
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

  const onOptionalChange = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
    const socials: string[] = [...createMetaData.optionals]
    socials[idx] = e.target.value
    dispatch(setCreateDaoMetaData({ optionals: socials }))
  }

  const addLink = () => {
    const socials: string[] = [...createMetaData.optionals]
    socials.push('')
    return dispatch(setCreateDaoMetaData({ optionals: socials }))
  }

  const remove = (index: number) => {
    const socials: string[] = [...createMetaData.optionals]
    socials.splice(index, 1)
    return dispatch(setCreateDaoMetaData({ optionals: socials }))
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
          {createMetaData.image ? (
            <Card
              className="img-card-preview-upload"
              bodyStyle={{ padding: 0, position: 'relative', height: '100%' }}
            >
              <Image
                src={createMetaData.image?.toString() || ''}
                preview={false}
              />
              <IonIcon
                className="ico-action-upload"
                name="trash-outline"
                onClick={() => dispatch(setCreateDaoMetaData({ image: '' }))}
              />
            </Card>
          ) : (
            <Upload
              className={`interdao-upload-metadata ${
                !!createMetaData.image ? 'uploaded' : ''
              }`}
              accept="image/png,image/jpg,image/webp"
              name="avatar"
              listType="picture-card"
              maxCount={1}
              onChange={onFileChange}
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
          )}
        </Space>
      </Col>
      <Col span={24}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Typography.Text>Social media (Optional)</Typography.Text>
          <Row gutter={[8, 8]}>
            {createMetaData.optionals.map((social, index) => (
              <Col span={24} key={index}>
                <Row gutter={[12, 12]}>
                  <Col span={22}>
                    <Input
                      value={social}
                      placeholder="Input link"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        onOptionalChange(e, index)
                      }
                      className="border-less"
                    />
                  </Col>
                  <Col span={2}>
                    <Button
                      type="text"
                      icon={<IonIcon name="trash-outline" />}
                      onClick={() => remove(index)}
                    />
                  </Col>
                </Row>
              </Col>
            ))}
            <Col span={24}>
              <Button
                type="dashed"
                icon={<IonIcon name="add-outline" />}
                onClick={addLink}
              >
                Add
              </Button>
            </Col>
          </Row>
        </Space>
      </Col>
    </Row>
  )
}

export default MetaDataForm
