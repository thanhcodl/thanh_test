import React, { useCallback, useMemo, useRef, useState, memo } from "react";
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from "react-redux";
import { getRotate } from "../../../helper";
import { changeTime, selectHour } from "../../../redux/timeSlice";
import OneLine from "../one-line";
import Path from "../path";

function HourClock(props) {
  const { handleChangeUnit } = props;

  let hour = Number(useSelector(selectHour))
  const dispatch = useDispatch()
  const ref = useRef()
  const corner = 30; // corner each hour: 360 / 12 = 30
  const half = 6 // half part circle
  const full = 12 // full circle
  const original = 270 // rotate = 270 reflect 12 hour
  const cornerStanding = 90 // at deg is 12 hour

  const { initRotate, initPath } = useMemo(() => {
    let initRotate = ''
    let initPath = 'long'

    if (hour == 0) {
      hour = 12
      initPath = 'short'
    } else if (hour > full) {
      hour -= full
      initPath = 'short'
    }
    initRotate = original + (hour * corner)
    return { initRotate, initPath }

  }, [])

  const [path, setPath] = useState(initPath);
  const [rotate, setRotate] = useState(initRotate)

  const handleClick = useCallback((e) => {
    let data = e.target.getAttribute('data-set')
    let numData = Number(data)
    let numHour = Number(hour)
    dispatch(changeTime({ key: 'hour', value: data }))
    let path = 'long'
    if (numData > full) {
      path = 'short'
      numData -= full
    }
    setPath(path)
    setRotate(prev => getRotate({ prev, old: numHour, cur: numData, half, full, corner }))
    if (ref.current) {
      ref.current.className = 'hour-clock opacity-hidden'
    }
    setTimeout(() => {
      handleChangeUnit('minutes')
    }, 300)
  }, [hour, half, full, dispatch, handleChangeUnit])

  return (
    <>
      <div className="hour-clock opacity-display" ref={ref}>
        {Array(half).fill(0).map((_, index) => {
          let firstVal = String(index || full)
          let firstLabel = String(index || full)
          let lastVal = String(index + half)
          let lastLabel = String(index + half)
          let rotate = cornerStanding + index * corner // calculate swivel angle

          const item = {
            firstVal, firstLabel, lastVal, lastLabel, rotate
          }
          return <OneLine key={`long${index}`} info={item} handleClick={handleClick} />
        })}

        {path === 'long' && <Path variant='long' rotate={rotate} />}

        {/* small circle */}
        <div className="hour-clock-small">
          {Array(half).fill(0).map((_, index) => {
            let firstVal = String(index + full)
            let firstLabel = String(index + full)
            let lastVal = String(index + full + half)
            let lastLabel = String(index + full + half)
            if (index === 0) {
              firstVal = '24'
              firstLabel = '00'
            }

            let rotate = cornerStanding + index * corner // calculate swivel angle
            const item = {
              firstVal, firstLabel, lastVal, lastLabel, rotate
            }
            return <OneLine key={`short${index}`} info={item} handleClick={handleClick} />
          })}

          {path === 'short' && <Path variant='short' rotate={rotate} />}
        </div>
        {/* small circle */}

      </div>
    </>
  )
}

HourClock.propTypes = {
  handleChangeUnit: PropTypes.func,
};

HourClock.defaultProps = {
  handleChangeUnit: () => { },
};

export default memo(HourClock);