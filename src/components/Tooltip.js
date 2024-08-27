// Tooltip.js
import React from 'react';
import './Tooltip.scss';

const Tooltip = ({ children, text }) => {
  return (
    <span className="tooltip-wrapper">
      {children}
      <span className="tooltip-text">{text}</span>
    </span>
  );
};

export default Tooltip;

