import React from "react";

function ListDay() {
  return (
    <div className="list-day">
      {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(item => {
        return <p key={item}>{item}</p>
      })}
    </div>
  )
}

export default ListDay;