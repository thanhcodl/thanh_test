import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectChosenDate, selectFullDate, setDate } from '../redux/dateSlice'
import { selectChosenTime, selectFullTime, setTime } from '../redux/timeSlice'
import Calendar from '../calendar'
import Clock from '../clock'
import ClockIcon from '../clock/clock-icon'
import { getCurrentDate, getCurrentTime, getListDate } from '../helper'
import { changeDisplay, selectDisplay } from '../redux/mainSlice'

function Main() {
  const display = useSelector(selectDisplay)
  const date = useSelector(selectFullDate)
  const time = useSelector(selectFullTime)
  const chosenDate = useSelector(selectChosenDate)
  const chosenTime = useSelector(selectChosenTime)
  const [curTime, setCurTime] = useState('')
  const dispatch = useDispatch()
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    const now = new Date()
    if (Object.keys(chosenTime).length !== 0) {
      if (time.isEmpty) {
        dispatch(setTime({ hour: chosenTime.hour, minutes: chosenTime.minutes }))
        const curTime = `${chosenTime.hour} : ${chosenTime.minutes}`
        setCurTime(curTime)
      } else {
        const curTime = `${chosenTime.hour} : ${chosenTime.minutes}`
        setCurTime(curTime)
      }
    } else {
      if (time.isEmpty) {
        const { hour, minutes, curTime: curTimeTemp } = getCurrentTime(now)
        dispatch(setTime({ hour, minutes }))
        setCurTime(curTimeTemp)
      }
    }
    setIsShow(true)
  }, [chosenTime, time, dispatch])

  const { curDate } = useMemo(() => {
    let curDate = ''
    const now = new Date()

    if (date.isEmpty) {
      const { date, month, year, curDate: curDateTemp } = getCurrentDate(now)
      curDate = curDateTemp
      const listDate = getListDate(year, now.getMonth() + 1)
      dispatch(setDate({ date, month, year, listDate }))
    } else {
      if (!chosenDate.date) {
        curDate = `${date.month}/${date.date}/${date.year}`
      } else
        curDate = `${chosenDate.month}/${chosenDate.date}/${chosenDate.year}`
    }
    return { curDate }
  }, [chosenDate, date, dispatch])

  const mapShow = useMemo(() => ({
    'clock': <Clock />,
    'calendar': <Calendar />
  }), [])

  const handleClickDate = useCallback(() => {
    dispatch(changeDisplay({ display: 'calendar' }))
  }, [dispatch])

  const handleClickTime = useCallback(() => {
    dispatch(changeDisplay({ display: 'clock' }))
  }, [dispatch])

  if (isShow)
    return (
      <React.Fragment>
        <main id='main'>
          <div className="main__input">
            <div className="input-area mb-6">
              <input id="calendar-input" className="input input-area__input" value={curDate} onChange={() => { }} onClick={handleClickDate} />
              <label className="input-area__label" onClick={handleClickDate}>Date mobile</label>
            </div>
            <div className="input-area">
              <input id="time-input" className="input input-area__input" value={curTime} onChange={() => { }} onClick={handleClickTime} />
              <label className="input-area__label" onClick={handleClickTime}>Time</label>
              <button onClick={handleClickTime}>
                <ClockIcon />
              </button>
            </div>
          </div>
        </main>

        {mapShow[display]}
      </React.Fragment>
    )
}

export default Main;