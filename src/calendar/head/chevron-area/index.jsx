import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListDate, getMonthString } from "../../../helper";
import { changeDate, selectMonth, selectYear } from "../../../redux/dateSlice";

function ChevronArea() {
  const dispatch = useDispatch()
  const month = Number(useSelector(selectMonth))
  const year = Number(useSelector(selectYear))

  const handleClickPrev = useCallback(() => {
    let newMonth = month - 1
    if (newMonth === 0) newMonth = 12
    const strMonth = getMonthString(newMonth)
    dispatch(changeDate({ key: 'month', value: strMonth || '' }))
    const listDate = getListDate(year, newMonth)
    if (listDate)
      dispatch(changeDate({ key: 'listDate', value: listDate }))
  }, [month, dispatch, year])

  const handleClickNext = useCallback(() => {
    let newMonth = month + 1
    if (newMonth === 13) newMonth = 1
    const strMonth = getMonthString(newMonth)
    dispatch(changeDate({ key: 'month', value: strMonth || '' }))
    const listDate = getListDate(year, newMonth)
    if (listDate)
      dispatch(changeDate({ key: 'listDate', value: listDate }))
  }, [month, dispatch, year])

  return (
    <div className="chevron-area">
      <button onClick={handleClickPrev}>
        <ChevronLeft />
      </button>
      <button onClick={handleClickNext}>
        <ChevronRight />
      </button>
    </div>
  )
}

export default ChevronArea;

function ChevronRight() {
  return (
    <svg fill='#fff' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
      <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
    </svg>
  )
}

function ChevronLeft() {
  return (
    <svg fill='#fff' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
      <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
    </svg>
  )
}