import React, { useCallback, useState } from "react"
import RoundClock from "./round-clock"
import InputClock from "./input-clock"
import Footer from "./round-clock/footer"

function Clock() {
  const [isRoundType, setIsRoundType] = useState(true) // clock type includes ['round', 'input']

  const handleChangeClockType = useCallback(() => {
    setIsRoundType(prev => !prev)
  }, [])

  return (
    <section id='clock' className="fixed">
      {isRoundType ? <RoundClock /> : <InputClock />}
      <Footer isRoundType={isRoundType} handleChangeClockType={handleChangeClockType} />
    </section>

  )
}

export default Clock;