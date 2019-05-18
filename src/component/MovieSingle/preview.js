import React from 'react';
import './style.scss';

export default ({ preview }) => (
  <img className="img-fluid movie-image" src={preview} alt=""/>
)