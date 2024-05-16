import React from "react";
import ChevronArea from "./chevron-area";
import MonthYear from "./month-year";

function HeadCalendar() {

  return (
    <section className="head-calendar">
      <MonthYear />
      <ChevronArea />
    </section>
  )
}

export default HeadCalendar;
