import React from 'react';
import {Link} from 'react-router-dom';
import './style.scss';

const MovieCard = ({ movie }) => {
	const to = '/movies/' + movie.id; 

	const excerpt = (string, len) => {
		return string.slice(0, len) + '...'
	}

  return (
    <div className="col-xl-6 movie-card">
		<div className="card">
			<Link to={to}>
				<img 
				src={movie.image_url} 
				className="card-img-top" 
				alt={movie.title} />
			</Link>

		    <div className="card-body">
			    <h5 className="card-title">
					<Link to={to}>{movie.title}</Link>
			    </h5>

			    <p className="card-text">
					{excerpt(movie.description, 150)}
			    </p>
			    
			    <div className="card-genre">
			    	<strong>Genre: </strong>
			    	<span>{movie.genre.name}</span>
			    </div>

			    <div className="card-visits">
			    	<strong>Visits: </strong>
			    	<span>{movie.visits}</span>
			    </div>

		    </div>
		</div>
    </div>
  );
};

export default MovieCard;
