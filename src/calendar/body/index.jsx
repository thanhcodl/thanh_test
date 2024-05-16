import React from "react";
import ListDate from "./date";
import ListDay from "./day";

function BodyCalendar() {
  return (
    <section id='body-calendar'>
      <ListDay />
      <ListDate />
    </section>
  )
}

export default BodyCalendar;