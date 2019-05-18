import React from 'react';
import Back from 'component/back';
import './style.scss';

export default ({ movie, history }) => (
  <div className="movie-header">
    <h4 className="movie-title">{movie.title}</h4>
    <Back history={history}>back</Back>
  </div>
)