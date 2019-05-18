import React from 'react';
import MovieStats from 'component/MovieStats';
import './style.scss';

export default ({ movie }) => (
  <div className="movie-body">
    <div className="movie-info">
      <div className="movie-info-field">
        <strong>Genre: </strong>
        <span className="text-value">{movie.genre && movie.genre.name}</span>
      </div>

      <MovieStats movie={movie} />
    </div>

    <p className="movie-description">{movie.description}</p>
  </div>
)