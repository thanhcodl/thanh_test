const getRotate = ({ prev, old, cur, half, full, corner }) => {
  let result = 0
  if (Math.abs(cur - old) > half) {
    if (cur - old < 0) {
      result = prev + ((full - Math.abs(cur - old)) * corner)
    } else {
      result = prev - ((full - (cur - old)) * corner)
    }
  } else {
    if (cur - old < 0) {
      result = prev + ((cur - old) * corner)
    } else {
      result = prev + ((cur - old) * corner)
    }
  }
  return result
}

function getMonthName(month) {
  // get month name from number
  if (!month) return undefined;
  const map = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
  }

  return map[Number(month)]
}

function getMonthString(month) {
  //month: 1 => 12
  if (month !== 0 && !month) return undefined
  return String(month).padStart(2, '0')
}

function getMountDateInMonth(year, month) {
  // year: full year
  //month: 1 => 12
  return new Date(year, month, 0).getDate();
}

function getFirstDayInMonth(year, month) {
  // year: full year
  //month: 0 => 11
  return new Date(year, month, 1).getDay();
}

const getListYear = (start, stop, step) => {
  return Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));
}

const getListDate = (year, month) => {
  // year: full year
  // month: 1 -> 12
  const mountDate = getMountDateInMonth(year, month)
  const firstDay = getFirstDayInMonth(year, month - 1)
  const result = [
    ...Array.from({ length: firstDay }, (_, i) => 0),
    ...Array.from({ length: mountDate }, (_, i) => i + 1),
  ]
  return result
}

const getCurrentTime = (now) => {
  const hour = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const curTime = `${hour} : ${minutes}`
  return { hour, minutes, curTime }
}

const getCurrentDate = (now) => {
  const date = String(now.getDate()).padStart(2, '0')
  const month = getMonthString(now.getMonth() + 1)
  const year = String(now.getFullYear())
  const curDate = `${month}/${date}/${year}`
  return { date, month, year, curDate }
}

const applyEffectHidden = ({ elemId, callback }) => {
  const ele = document.getElementById(elemId)
  if (ele) {
    ele.classList.toggle('opacity-hidden')
  }
  setTimeout(callback, 340)
}


export {
  applyEffectHidden,
  getCurrentDate,
  getCurrentTime,
  getListDate,
  getListYear,
  getRotate,
  getMonthName,
  getMonthString,
  getMountDateInMonth,
  getFirstDayInMonth
}