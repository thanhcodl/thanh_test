import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyEffectHidden, getMonthName } from "../../../helper";
import { changeDate, selectMonth, selectYear, selectShowYear } from "../../../redux/dateSlice";

function MonthYear() {
  const dispatch = useDispatch();
  const month = useSelector(selectMonth)
  const year = useSelector(selectYear)
  const isShowListYear = useSelector(selectShowYear)

  const handleClick = useCallback(() => {
    if (isShowListYear) {
      applyEffectHidden({
        elemId: 'list-year',
        callback: () => { dispatch(changeDate({ key: 'isShowListYear', value: !isShowListYear })) }
      })
    } else
      dispatch(changeDate({ key: 'isShowListYear', value: !isShowListYear }))
  }, [isShowListYear])

  return (
    <section className="month-year" onClick={handleClick}>
      <p className="month">{getMonthName(month) || ''}</p>
      <p className="year">{year || ''}</p>
      <svg fill='#fff' style={{ transform: `rotate(${isShowListYear ? '90' : '270'}deg)`, width: '0.6rem', transition: 'all 0.2s' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
      </svg>
    </section>
  )
}

export default MonthYear;