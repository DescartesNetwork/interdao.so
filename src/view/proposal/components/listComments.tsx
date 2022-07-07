import { CSSProperties, Fragment, ReactNode } from 'react'
import { util } from '@sentre/senhub'
import moment from 'moment'
import { account } from '@senswap/sen-js'

import {
  Avatar,
  Button,
  Card,
  Col,
  Empty,
  Row,
  Space,
  Tag,
  Typography,
} from 'antd'
import { COMMENTS_VOTE_TYPE } from 'constant'
import IonIcon from '@sentre/antd-ionicon'
import CardLoading from 'components/cardLoading'

import { CommentProposal } from 'model/comments.controller'

type CommentVoteTagProps = {
  tagColor?: string
  children?: ReactNode
  style?: CSSProperties
}
const CommentVoteTag = ({ children, tagColor, style }: CommentVoteTagProps) => {
  if (!children) return <Fragment />

  const tagStyle = tagColor
    ? { color: tagColor, background: `${tagColor}1a` }
    : {}

  return (
    <Tag
      style={{
        ...tagStyle,
        border: 'none',
        ...style,
      }}
    >
      {children}
    </Tag>
  )
}

type CardCommentProps = { comment: CommentProposal }
const CardComment = ({ comment }: CardCommentProps) => {
  const { authority: walletAddress, content, time, voteState } = comment
  const tagComment = voteState && COMMENTS_VOTE_TYPE[voteState]

  return (
    <Card
      style={{
        borderWidth: '0 0 1px 0',
        borderRadius: 0,
        background: 'transparent',
      }}
      bodyStyle={{
        paddingLeft: 0,
        paddingRight: 0,
      }}
    >
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Row gutter={[16, 16]}>
            <Col>
              <Avatar size={48}>
                {walletAddress && walletAddress.substring(0, 2)}
              </Avatar>
            </Col>
            <Col flex="auto">
              <Space direction="vertical">
                <Space>
                  <Typography.Text>
                    {util.shortenAddress(walletAddress || '')}
                  </Typography.Text>
                  <Button
                    type="text"
                    icon={<IonIcon name="open-outline" />}
                    onClick={() =>
                      window.open(util.explorer(walletAddress), '_blank')
                    }
                    disabled={!account.isAddress(walletAddress)}
                  />
                </Space>
                <Space>
                  <CommentVoteTag tagColor={tagComment?.color}>
                    {tagComment?.label}
                  </CommentVoteTag>
                  <Typography.Text type="secondary">
                    {moment(time).fromNow()}
                  </Typography.Text>
                </Space>
              </Space>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Typography.Text>{content}</Typography.Text>
        </Col>
      </Row>
    </Card>
  )
}

type ListCommentsProps = { comments: CommentProposal[] }
const ListComments = ({ comments }: ListCommentsProps) => {
  if (!comments.length) return <Empty />

  return (
    <Fragment>
      <CardLoading loading />
      {comments.map((comment, idx) => (
        <CardComment comment={comment} key={idx} />
      ))}
    </Fragment>
  )
}

export default ListComments
