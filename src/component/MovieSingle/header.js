import React from 'react';
import AddToWatchlist from 'component/Watchlist/add';
import './style.scss';

export default ({ movie, history }) => (
  <div className="movie-header">
    <h4 className="movie-title">{movie.title}</h4>
    <AddToWatchlist movie={movie} />
  </div>
)