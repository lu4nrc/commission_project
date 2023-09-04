import React from 'react';
import './style.css';
function Toggle({onClick, isCheck}) {
  return (
    <>
<label className="switch">
  <input type="checkbox" onClick={onClick} checked={isCheck}/>
  <span className="slider"></span>
</label>
    </>
  );
}

export default Toggle;
