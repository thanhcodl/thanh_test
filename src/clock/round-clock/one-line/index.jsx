import React, { memo } from "react";
import PropTypes from 'prop-types';

function OneLine(props) {
  const { info, handleClick } = props
  const { firstVal, firstLabel, lastVal, lastLabel, rotate } = info
  let newFirst = firstLabel;
  let newLast = lastLabel;

  if (firstLabel.length === 1) newFirst = `\u00A0${firstLabel}\u00A0`
  if (lastLabel.length === 1) newLast = `\u00A0${lastLabel}\u00A0`

  return (
    <div className="hour-clock__child rotate-z-90" style={{ transform: `rotateZ(${rotate}deg)` }} >
      <div className="hour-clock__child-digit"
        style={{ transform: `rotateZ(-${rotate}deg)` }}
        data-set={firstVal}
        onClick={handleClick}
      >

        {newFirst}
      </div>
      <div className="hour-clock__child-digit"
        style={{ transform: `rotateZ(-${rotate}deg)` }}
        data-set={lastVal}
        onClick={handleClick}
      >
        {newLast}
      </div>
    </div>
  )
}

OneLine.propTypes = {
  info: PropTypes.object,
  handleClick: PropTypes.func,
};

OneLine.defaultProps = {
  info: { firstVal: '00', firstLabel: '00', lastVal: '06', lastLabel: '06', rotate: '90' },
  handleClick: () => { },
};

export default memo(OneLine);