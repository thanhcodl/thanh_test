import React, { useCallback, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getRotate } from "../../../helper"
import { changeTime, selectMinutes } from "../../../redux/timeSlice"
import OneLineMinutes from "../one-line-minutes"
import Path from "../path"

function MinutesClock() {
  const corner = 6 // corner each minute: 360 / 60 = 6
  const half = 30 // half part circle
  const full = 60 // full circle
  const original = 270 // rotate = 270 reflect 12 hour
  const cornerStanding = 90 // at deg is 12 hour
  const minutes = Number(useSelector(selectMinutes))
  const dispatch = useDispatch()
  const [rotate, setRotate] = useState(original + (minutes * corner))

  const handleClick = useCallback((e) => {
    let data = e.target.getAttribute('data-set')
    const cur = Number(data)

    setRotate(prev => getRotate({ prev, old: minutes, cur, half, full, corner }))
    dispatch(changeTime({ key: 'minutes', value: data }))
  }, [minutes, half, full, dispatch])

  return (
    <div className="hour-clock opacity-display w-18">
      {Array(half).fill(0).map((_, index) => {
        let firstVal = String(index).padStart(2, '0')
        let firstLabel = String(index).padStart(2, '0')
        let lastVal = String(index + half)
        let lastLabel = String(index + half)
        const rotate = cornerStanding + index * corner // calculate swivel angle

        if (index % 5 !== 0) {
          firstLabel = '.'
          lastLabel = '.'
        }
        const item = {
          firstVal, firstLabel, lastVal, lastLabel, rotate
        }
        return <OneLineMinutes key={`minutes${index}`} info={item} handleClick={handleClick} />
      })}

      <Path variant='long' rotate={rotate} />
    </div>
  )
}

export default MinutesClock;
