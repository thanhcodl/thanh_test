import React, { memo } from "react";
import PropTypes from 'prop-types';


function Path(props) {
  const { variant, rotate } = props
  const isLong = variant === 'long' // variant includes ['long', 'short']
  return (
    <>
      <div className="hour-clock__child" style={{ justifyContent: 'center', zIndex: '-1' }}>
        <div className="path-center" />
      </div>
      <div className="hour-clock__path" style={{ transform: `rotateZ(${rotate}deg)` }}>
        <div style={{ width: 'calc(50% - 1.5rem)', height: '2px', backgroundColor: 'red' }} />
        <div className="path-circle"
          style={{ marginRight: isLong ? '-0.45rem' : '-0.59rem' }} />
      </div>
    </>
  )
}

Path.propTypes = {
  variant: PropTypes.string,
  rotate: PropTypes.number,
};


export default memo(Path)