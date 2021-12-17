export const getDateFormatForAPICall = (start, end) => {
  const [startMonth, startDay, startYear] = [
    pad(start.getMonth() + 1),
    pad(start.getDate()),
    pad(start.getFullYear())
  ]
  const [endMonth, endDay, endYear] = [
    pad(end.getMonth() + 1),
    pad(end.getDate()),
    pad(end.getFullYear())
  ]
  const startDate = startYear + '-' + startMonth + '-' + startDay
  const endDate = endYear + '-' + endMonth + '-' + endDay
  return [startDate, endDate]
}

function pad (n) {
  return n < 10 ? '0' + n : n
}
