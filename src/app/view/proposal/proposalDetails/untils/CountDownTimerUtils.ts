import dayjs from 'dayjs'

export function getRemainingTimeUntilMsTimestamp(
  timestampMs: number,
  finishTime?: number,
) {
  const timestampDayjs = dayjs(timestampMs)
  const nowDayjs = finishTime ? finishTime : dayjs()

  // times of the past
  if (timestampDayjs.isBefore(nowDayjs)) {
    return {
      minutes: '00',
      hours: '00',
      days: '00',
      seconds: '00',
    }
  }

  return {
    minutes: getRemainingMinutes(nowDayjs, timestampDayjs),
    hours: getRemainingHours(nowDayjs, timestampDayjs),
    days: getRemainingDays(nowDayjs, timestampDayjs),
    seconds: getRemainingSeconds(nowDayjs, timestampDayjs),
  }
}

/** Get the difference function */
function getRemainingSeconds(nowDayjs: any, timestampDayjs: any) {
  const seconds = (timestampDayjs.diff(nowDayjs, 'seconds') % 60) % 60
  return startWithZeros(seconds, 2)
}

function getRemainingMinutes(nowDayjs: any, timestampDayjs: any) {
  const minutes = timestampDayjs.diff(nowDayjs, 'minutes') % 60
  return startWithZeros(minutes, 2)
}

function getRemainingHours(nowDayjs: any, timestampDayjs: any) {
  const hours = timestampDayjs.diff(nowDayjs, 'hours') % 24
  return startWithZeros(hours, 2)
}

function getRemainingDays(nowDayjs: any, timestampDayjs: any) {
  const days = timestampDayjs.diff(nowDayjs, 'days')
  return days.toString()
}

function startWithZeros(number: number, minLength: number) {
  const numberString = number.toString()
  if (numberString.length >= minLength) return numberString
  return '0'.repeat(minLength - numberString.length) + numberString
}
