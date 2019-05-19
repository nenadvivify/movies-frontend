import React from 'react';
import './style.scss';

export default ({ show, style }) => {
  return show && (
    <div 
    className="spinner-border spinner-border-sm spinner text-secondary" 
    style={{...style}} 
    role="status">
      <span className="sr-only">Loading...</span>
    </div>
  )
}