import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)

export const dateUtils = {
  fromNow: (date: string | Date) => dayjs(date).fromNow(),
  
  format: (date: string | Date, format = 'DD MMM YYYY') => 
    dayjs(date).format(format),
  
  formatWithTime: (date: string | Date) => 
    dayjs(date).format('DD MMM YYYY HH:mm'),
  
  isSameDay: (date1: string | Date, date2: string | Date) => 
    dayjs(date1).isSame(date2, 'day'),
  
  startOfDay: (date: string | Date) => 
    dayjs(date).startOf('day').toISOString(),
  
  endOfDay: (date: string | Date) => 
    dayjs(date).endOf('day').toISOString(),
  
  addDays: (date: string | Date, days: number) => 
    dayjs(date).add(days, 'day').toISOString(),
  
  isAfter: (date1: string | Date, date2: string | Date) => 
    dayjs(date1).isAfter(date2),
} 