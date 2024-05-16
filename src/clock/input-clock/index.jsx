import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTime, selectHour, selectMinutes } from "../../redux/timeSlice";

function InputClock() {
  const dispatch = useDispatch()
  const hour = useSelector(selectHour)
  const minutes = useSelector(selectMinutes)
  const minHour = 0
  const maxHour = 23
  const minMinute = 0
  const maxMinute = 59

  const handleChange = (key, value) => {
    dispatch(changeTime({ key, value }))
  }

  const checkValid = (e) => {
    if (['-', '+', 'e'].includes(e.key)) e.preventDefault();
  }

  return (
    <div id='input-clock' className="opacity-display" >
      <h2 className="title-1">
        Đặt giờ
      </h2>
      <p className="title-2">Nhập thời gian</p>
      <div className="input-area">
        <input value={hour} type='number'
          onKeyDown={checkValid}
          onChange={(e) => {
            const val = e.target.value
            const valNum = Number(val)
            if (valNum < minHour || valNum > maxHour) return
            handleChange('hour', val)
          }} />
        <span>&nbsp;:&nbsp;</span>
        <input value={minutes} type='number'
          onKeyDown={checkValid}
          onChange={(e) => {
            const val = e.target.value
            const valNum = Number(val)
            if (valNum < minMinute || valNum > maxMinute) return
            handleChange('minutes', val)
          }} />
      </div>
      <div className="desc-area">
        <p>giờ</p>
        <p>phút</p>
      </div>
    </div>
  )
}

export default InputClock;