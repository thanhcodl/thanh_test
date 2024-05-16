import React from "react";
import { useSelector } from "react-redux";
import { selectShowYear } from "../redux/dateSlice";
import BodyCalendar from "./body";
import HeadCalendar from "./head";
import ListYear from "./list-year";

function Calendar() {
  const isShowListYear = useSelector(selectShowYear)

  return (
    <section id='calendar' className="fixed">
      <HeadCalendar />
      {isShowListYear ? <ListYear /> : (
        <div>
          <BodyCalendar />
        </div>
      )}

    </section>
  )
}

export default Calendar