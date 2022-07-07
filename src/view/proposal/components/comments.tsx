import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useIpfsolWatcher } from 'helpers/useIpfsolWatcher'
import { AppDispatch, AppState } from 'model'
import { getComments } from 'model/comments.controller'

const Comments = ({ proposalAddress }: { proposalAddress: string }) => {
  const comments = useSelector(
    (state: AppState) => state.comments[proposalAddress],
  )
  const dispatch = useDispatch<AppDispatch>()
  useIpfsolWatcher(proposalAddress)

  const fetchComments = useCallback(async () => {
    await dispatch(getComments(proposalAddress)).unwrap()
  }, [dispatch, proposalAddress])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  console.log('comment', comments)
  return <div>Comments: {proposalAddress}</div>
}

export default Comments
