import React from 'react';
import {Link} from 'react-router-dom';
import './style.scss';

const MovieCard = ({ movie }) => {
  return (
    <div className="col-sm-6 movie-card">
		<div className="card">
		  <img src={movie.image_url} className="card-img-top" alt={movie.title} />

		  <div className="card-body">
		    <h5 className="card-title">
				<Link to={`/movies/${movie.id}`}>{movie.title}</Link>
		    </h5>

		    <p className="card-text">{movie.description.slice(0, 300)}</p>
		  </div>
		</div>
    </div>
  );
};

export default MovieCard;
