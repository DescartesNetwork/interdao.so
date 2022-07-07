import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'

import { Button, Card, Col, Row, Space, Tag, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import RowBetweenNodeTitle from 'components/rowBetweenNodeTitle'
import ActionCommentOnly from './actionCommentOnly'
import ListComments from './listComments'

import { AppDispatch } from 'model'
import { CommentProposal, getComments } from 'model/comment.controller'

type DiscussionProps = { total?: number }
const Discussion = ({ total = 0 }: DiscussionProps) => {
  return (
    <Space>
      <Typography.Title level={5}>Discussion</Typography.Title>
      <Tag>{total}</Tag>
    </Space>
  )
}

type CommentsProps = { proposalAddress: string }
const Comments = ({ proposalAddress }: CommentsProps) => {
  const [comment, setComment] = useState<Record<string, CommentProposal[]>>()
  const dispatch = useDispatch<AppDispatch>()

  const fetchComments = useCallback(async () => {
    const { bulk } = await dispatch(getComments(proposalAddress)).unwrap()
    setComment(bulk)
  }, [dispatch, proposalAddress])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  const pareStringToDate = (time: string) => {
    return Date.parse(time)
  }

  const mergedComments = useMemo(() => {
    if (!comment || !Object.keys(comment).length) return []

    let listComments: CommentProposal[] = []
    for (const item of Object.values(comment)) {
      listComments.push(...item)
    }
    listComments.sort(
      (a, b) => pareStringToDate(b.time) - pareStringToDate(a.time),
    )

    return listComments
  }, [comment])

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
        <Col span={24}>
          <ListComments comments={mergedComments} />
        </Col>
        {/* view more comment */}
        <Col>
          <Button
            type="text"
            icon={<IonIcon name="chevron-down-outline" onClick={() => {}} />}
            disabled={!mergedComments?.length || mergedComments?.length < 5}
          >
            View more
          </Button>
        </Col>
      </Row>
    </Card>
  )
}

export default Comments
