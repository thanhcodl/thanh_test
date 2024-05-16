import React, { memo } from "react";
import PropTypes from 'prop-types';

function OneLineMinutes(props) {
  const { info, handleClick } = props
  const { firstVal, firstLabel, lastVal, lastLabel, rotate } = info

  let newFirst = firstLabel;
  let newLast = lastLabel;

  return (
    <div className="hour-clock__child rotate-z-90" style={{ transform: `rotateZ(${rotate}deg)` }} >
      {firstLabel === '.' ? (<Circle value={firstVal} handleClick={handleClick} />) : (
        <div className="hour-clock__child-digit"
          style={{
            transform: firstVal === '00' ? `rotateZ(${rotate}deg` : `rotateZ(-${rotate}deg)`,
          }}
          data-set={firstVal}
          onClick={handleClick}
        >
          {newFirst}
        </div>
      )}

      {lastLabel === '.' ? (<Circle value={lastVal} handleClick={handleClick} />) : (
        <div className="hour-clock__child-digit"
          style={{
            transform: `rotateZ(-${rotate}deg)`,
          }}
          data-set={lastVal}
          onClick={handleClick}
        >
          {newLast}
        </div>
      )}
    </div>
  )
}

OneLineMinutes.propTypes = {
  info: PropTypes.object,
  handleClick: PropTypes.func,
};

OneLineMinutes.defaultProps = {
  info: { firstVal: '00', firstLabel: '00', lastVal: '06', lastLabel: '06', rotate: '90' },
  handleClick: () => { },
};

export default memo(OneLineMinutes);

function Circle(props) {
  const { value, handleClick } = props;
  return <div data-set={value} style={{ cursor: 'pointer', width: '4px', height: '1px', borderRadius: '50%', backgroundColor: '#fff', margin: '0px 5px' }} onClick={handleClick} />
}