import React, { useCallback, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { applyEffectHidden, getCurrentTime } from "../../../helper";
import { changeDisplay } from "../../../redux/mainSlice";
import { changeTime, selectChosenTime, selectFullTime, selectHour, selectMinutes, setTime } from "../../../redux/timeSlice";
import ClockIcon from "../../clock-icon";
import Keyboard from "../../keyboard";

function Footer(props) {
  const { isRoundType, handleChangeClockType } = props;
  const dispatch = useDispatch()
  const hour = useSelector(selectHour)
  const minutes = useSelector(selectMinutes)
  const chosenTime = useSelector(selectChosenTime)
  const time = useSelector(selectFullTime)

  const handleClickOk = useCallback(() => {
    dispatch(changeTime({ key: 'chosen', value: { hour, minutes } }))
    applyEffectHidden({
      elemId: 'clock',
      callback: () => { dispatch(changeDisplay({ display: '' })) }
    })
  }, [hour, minutes, dispatch])

  const handleCancel = useCallback(() => {
    const now = new Date()
    if (Object.keys(chosenTime).length !== 0) {
      if (time.isEmpty) {
        dispatch(setTime({ hour: chosenTime.hour, minutes: chosenTime.minutes }))
      } else {
        dispatch(setTime({ hour: chosenTime.hour, minutes: chosenTime.minutes }))
      }
    } else {
      if (time.isEmpty) {
        const { hour, minutes } = getCurrentTime(now)
        dispatch(setTime({ hour, minutes }))
      } else {
        const { hour, minutes } = getCurrentTime(now)
        dispatch(setTime({ hour, minutes }))
      }
    }
  }, [chosenTime, dispatch, time.isEmpty])

  const handleClickCancel = useCallback(() => {
    setTimeout(() => {
      handleCancel()
    }, 340)

    applyEffectHidden({
      elemId: 'clock',
      callback: () => { dispatch(changeDisplay({ display: '' })) }
    })
  }, [dispatch, handleCancel])

  return (
    <div className="round-clock__footer">
      <button className="round-clock__footer-icon" onClick={() => handleChangeClockType()}>
        {isRoundType ? <Keyboard fill='rgb(185, 179, 179)' /> : <ClockIcon fill='rgb(185, 179, 179)' />}
      </button>
      <div className="round-clock__footer-button">
        <button onClick={handleClickCancel}>Cancel</button>
        <button onClick={handleClickOk}>OK</button>
      </div>
    </div>
  )
}

Footer.propTypes = {
  isRoundType: PropTypes.bool,
  handleChangeClockType: PropTypes.func,
};

Footer.defaultProps = {
  isRoundType: true,
  handleChangeClockType: () => { },
};

export default memo(Footer);