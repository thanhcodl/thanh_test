import React, { useCallback, useMemo, useState } from "react";
import Heading from "./heading";
import HourClock from "./hour-clock";
import MinutesClock from "./minutes-clock";

function RoundClock() {
  const [unit, setUnit] = useState('hour') // control change unit includes ['hour', 'minutes']

  const handleChangeUnit = useCallback((val) => {
    setUnit(val)
  }, [])

  const mapUnit = useMemo(() => ({
    'hour': <HourClock handleChangeUnit={handleChangeUnit} />,
    'minutes': <MinutesClock />
  }), [handleChangeUnit])

  return (
    <section id='round-clock'>
      <Heading unit={unit} handleChangeUnit={handleChangeUnit} />
      {mapUnit[unit]}
    </section>
  )
}

export default RoundClock;