import React, { memo } from "react";
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import { selectHour, selectMinutes } from "../../../redux/timeSlice";

function Heading(props) {
  const { unit, handleChangeUnit } = props
  const hour = useSelector(selectHour)
  const minutes = useSelector(selectMinutes)

  return (
    <div className="round-clock__current">
      <p onClick={() => handleChangeUnit('hour')}
        style={{ color: unit === 'minutes' ? '#beb8b8' : '#fff' }}
      >
        {hour}</p>
      <span>&nbsp;:&nbsp;</span>
      <p onClick={() => handleChangeUnit('minutes')}
        style={{ color: unit === 'hour' ? '#beb8b8' : '#fff' }}
      >
        {minutes}</p>
    </div>
  )
}

Heading.propTypes = {
  unit: PropTypes.string,
  handleChangeUnit: PropTypes.func,
};

Heading.defaultProps = {
  unit: 'hour',
  handleChangeUnit: () => { },
};

export default memo(Heading);