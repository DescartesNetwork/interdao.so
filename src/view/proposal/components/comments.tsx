import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { Button, Card, Col, Row, Space, Tag, Typography } from 'antd'
import CardComment from './cardComment'
import IonIcon from '@sentre/antd-ionicon'
import RowBetweenNodeTitle from 'components/rowBetweenNodeTitle'

import { AppDispatch } from 'model'
import { CommentProposal, getComments } from 'model/comment.controller'
import ActionCommentOnly from './actionCommentOnly'

const Discussion = () => {
  return (
    <Space>
      <Typography.Title level={5}>Discussion</Typography.Title>
      <Tag>3</Tag>
    </Space>
  )
}

const Comments = ({ proposalAddress }: { proposalAddress: string }) => {
  const [comment, setComment] = useState<Record<string, CommentProposal[]>>()
  const dispatch = useDispatch<AppDispatch>()

  const fetchComments = useCallback(async () => {
    const { bulk } = await dispatch(getComments(proposalAddress)).unwrap()
    setComment(bulk)
  }, [dispatch, proposalAddress])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  const disabled = !comment || Object.keys(comment).length < 5

  return (
    <Card bordered={false}>
      <Row gutter={[24, 24]} justify="center">
        {/* Comment header */}
        <Col span={24}>
          <RowBetweenNodeTitle title={<Discussion />}>
            <ActionCommentOnly />
          </RowBetweenNodeTitle>
        </Col>

        {/* List comments */}
        {!!comment &&
          Object.keys(comment).map((walletAddress, idx) => (
            <Col span={24}>
              <CardComment walletAddress={walletAddress} key={idx} />
            </Col>
          ))}

        {/* view more comment */}
        <Col>
          <Button
            type="text"
            icon={<IonIcon name="chevron-down-outline" onClick={() => {}} />}
            disabled={disabled}
          >
            View more
          </Button>
        </Col>
      </Row>
    </Card>
  )
}

export default Comments
