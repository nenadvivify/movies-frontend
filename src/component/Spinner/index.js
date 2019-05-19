import React from 'react';
import './style.scss';

export default ({ show }) => {
  return show && (
    <div className="spinner-border spinner-border-sm spinner text-primary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  )
}