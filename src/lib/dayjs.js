import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import isToday from 'dayjs/plugin/isToday'
import isYesterday from 'dayjs/plugin/isYesterday'
import advancedFormat from 'dayjs/plugin/advancedFormat'

dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)
dayjs.extend(isToday)
dayjs.extend(isYesterday)
dayjs.extend(advancedFormat)

export const dateFormatted = date => `${dayjs(date).format('MMM Do')}`
export const timeFormatted = date => dayjs(date).format('LT')

export const friendlyDateFormat = date => {
  if (!date) return '-'

  if (dayjs(date).isToday(date)) return `Today, about ${dayjs(date).fromNow()}`

  if (dayjs(date).isYesterday(date)) return `Yesterday at ${timeFormatted(date)}`

  return `${dateFormatted(date)} at ${timeFormatted(date)}`
}
