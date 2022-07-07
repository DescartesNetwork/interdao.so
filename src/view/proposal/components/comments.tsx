import { AppDispatch } from 'model'
import { CommentProposal, getComments } from 'model/comment.controller'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

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

  console.log('comment', comment)
  return <div>Comments: {proposalAddress}</div>
}

export default Comments
