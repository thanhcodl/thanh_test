import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyEffectHidden } from "../../../helper";
import { changeDate, selectChosenDate, selectDate, selectListDate, selectMonth, selectYear } from "../../../redux/dateSlice";
import { changeDisplay } from "../../../redux/mainSlice";

function ListDate() {
  const dispatch = useDispatch()
  const now = new Date()
  const nowYear = now.getFullYear()
  const nowMonth = now.getMonth()
  const nowDate = now.getDate()
  const listDate = useSelector(selectListDate)
  const year = useSelector(selectYear)
  const month = useSelector(selectMonth)
  const date = useSelector(selectDate)
  const chosen = useSelector(selectChosenDate)

  const isMonthYearCurrent = year == nowYear && month == nowMonth + 1
  const isMonthYearChosen = year == chosen.year && month == chosen.month

  const handleClick = useCallback((date) => {
    dispatch(changeDate({
      key: 'chosen',
      value: {
        month, year,
        date: String(date).padStart(2, '0'),
      }
    }))
    applyEffectHidden({
      elemId: 'calendar',
      callback: () => { dispatch(changeDisplay({ display: '' })) }
    })
  }, [month, year, date])


  return (
    listDate.length !== 0 && (
      <div className="list-date opacity-display">
        {listDate.map((item, index) => {
          let className = 'btn'
          if (isMonthYearCurrent && nowDate == item) {
            className = 'current'
          } else if (isMonthYearChosen && chosen.date == item) {
            className = 'active'
          }

          return (
            <div key={`date${index}${year}${month}`} style={{ width: '100%', height: '100%', display: 'flex' }}>
              {item !== 0 && (
                <button style={{ margin: 'auto', animationDuration: '0.7s' }} className={`${className} opacity-display`} onClick={() => handleClick(item)} >
                  {item}
                </button>
              )}
            </div>
          )
        })}
      </div>
    )
  )
}

export default ListDate;