import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListYear } from "../../helper";
import { changeDate, selectYear } from "../../redux/dateSlice";

function ListYear() {
  const cur = new Date().getFullYear()
  const dispatch = useDispatch()
  const year = useSelector(selectYear)

  const handleClickYear = useCallback((year) => {
    dispatch(changeDate({ key: 'year', value: year }))
    dispatch(changeDate({ key: 'isShowListYear', value: false }))
  }, [dispatch])

  const listYear = getListYear(cur + 50, cur - 100, -1) // get list year from current - 100 -> current + 50

  return (
    <section id='list-year' className="opacity-display">
      {listYear && listYear.reverse().map((item) => {
        let className = ''
        if (year == item) className = 'active'
        else if (cur == item) className = 'current'

        return (
          <button key={item} className={className} onClick={() => handleClickYear(item)}>
            {item}
          </button>
        )
      })}
    </section>
  )
}

export default ListYear;