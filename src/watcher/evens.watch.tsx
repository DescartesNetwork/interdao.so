import { Fragment, useCallback, useEffect } from 'react'
import configs from 'configs'

const {
  sol: { interDao },
} = configs

// Watch id
type WatchState = {
  id: number
  interval: NodeJS.Timer | undefined
  callbacks: ((data: any) => void)[]
}

const EVENTS = [
  // Dao Event
  'InitializeDAOEvent',
  'UpdateDaoRegimeEvent',
  'UpdateSupplyEvent',
  'TransferAuthorityEvent',
  'UpdateDaoMetadataEvent',
  // Proposal Event
  'InitializeProposalEvent',
  'ExecuteProposalEvent',
  //
  'VoteForEvent',
  'VoteAgainstEvent',
  'CloseEvent',
]
const TIME_RECHECK = 500

const watcherState: Record<string, WatchState> = {}

const reloadData = (event: string, data: any) => {
  const callbacks = watcherState[event].callbacks
  for (const callback of callbacks) {
    callback(data)
  }
}

export const addEventListener = (
  events: string[],
  callback?: (data: any) => void,
) => {
  for (const event of events) {
    if (!watcherState[event])
      watcherState[event] = { id: 0, interval: undefined, callbacks: [] }
    if (callback) watcherState[event].callbacks.push(callback)
  }
}

const EventsWatcher = () => {
  // Watch dao events
  const watchData = useCallback(async () => {
    for (const event of EVENTS) {
      const state = watcherState[event] || {
        id: 0,
        interval: undefined,
        callbacks: [],
      }
      if (state.interval || state.id) continue
      state.interval = setInterval(async () => {
        if (state.id) return clearInterval(state.interval)
        state.id = await interDao.addListener(event as any, (data) =>
          reloadData(event, data),
        )
      }, TIME_RECHECK)
    }
  }, [])

  useEffect(() => {
    watchData()
    // Unwatch (cancel socket)
    return () => {
      ;(async () => {
        for (const event of EVENTS) {
          const state = watcherState[event]
          try {
            await interDao.removeListener(state.id)
          } catch (er: any) {
            console.warn(er.message)
          } finally {
            state.id = 0
          }
        }
      })()
    }
  }, [watchData])

  return <Fragment />
}
export default EventsWatcher
