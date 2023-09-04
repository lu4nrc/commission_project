import React from 'react';
import './style.css';
function Toggle() {
  return (
    <>
<label className="switch">
  <input type="checkbox"/>
  <span className="slider"></span>
</label>
    </>
  );
}

export default Toggle;
