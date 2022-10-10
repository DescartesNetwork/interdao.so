import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Card, Col, Row, Space, Tag, Typography } from 'antd'
import ListComments from './listComments'
import RowBetweenNodeTitle from 'components/rowBetweenNodeTitle'
import ActionCommentOnly from './actionCommentOnly'
import IonIcon from '@sentre/antd-ionicon'
import CommentLoading from './commentLoading'

import { CommentProposal, getComments } from 'model/comments.controller'
import { useContentWatcher } from 'helpers/useContentWatcher'
import { AppDispatch, AppState } from 'model'

const DEFAULT_AMOUNT_COMMENTS = 4

type DiscussionProps = { total: number }
const Discussion = ({ total }: DiscussionProps) => {
  return (
    <Space>
      <Typography.Title level={5}>Discussion</Typography.Title>
      <Tag>{total}</Tag>
    </Space>
  )
}

type CommentsProps = { proposalAddress: string }
const Comments = ({ proposalAddress }: CommentsProps) => {
  const [amount, setAmount] = useState(DEFAULT_AMOUNT_COMMENTS)
  const comments = useSelector(
    (state: AppState) => state.comments[proposalAddress],
  )
  const dispatch = useDispatch<AppDispatch>()
  const { loading } = useContentWatcher(proposalAddress)

  const fetchComments = useCallback(async () => {
    await dispatch(getComments(proposalAddress)).unwrap()
  }, [dispatch, proposalAddress])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  const pareStringToDate = (time: string) => {
    return Date.parse(time)
  }

  const mergedComments = useMemo(() => {
    if (!comments || !Object.keys(comments).length) return []

    let listComments: CommentProposal[] = []
    for (const item of Object.values(comments)) {
      listComments.push(...item)
    }
    listComments.sort(
      (a, b) => pareStringToDate(b.time) - pareStringToDate(a.time),
    )

    return listComments
  }, [comments])

  return (
    <Card bordered={false}>
      <Row gutter={[24, 24]} justify="center">
        {/* Comment header */}
        <Col span={24}>
          <RowBetweenNodeTitle
            title={<Discussion total={mergedComments.length} />}
          >
            <ActionCommentOnly />
          </RowBetweenNodeTitle>
        </Col>

        {/* List comments */}
        <Col span={24}>
          <CommentLoading loading={loading} />
          <ListComments comments={mergedComments.slice(0, amount)} />
        </Col>

        {/* view more comment */}
        <Col>
          <Button
            type="text"
            icon={<IonIcon name="chevron-down-outline" />}
            onClick={() => setAmount(amount + DEFAULT_AMOUNT_COMMENTS)}
            disabled={mergedComments?.length < DEFAULT_AMOUNT_COMMENTS}
          >
            View more
          </Button>
        </Col>
      </Row>
    </Card>
  )
}

export default Comments
