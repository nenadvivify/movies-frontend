import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import Back from 'component/back';
import './style.scss';

class Movie extends Component {
    render() {
    	const {loading, movie} = this.props;
		
		if(loading) {
			return <div className="container center">
				<div className="spinner-border" role="status">
				  <span className="sr-only">Loading...</span>
				</div>
			</div>
		}


		return (
			<div className="container">
				<div className="row">
					<div className="col-md-8 main-content">
					{
						!movie ? (
								<div>Movie not found</div>
							) : (
								<>
								<div className="movie">
									<Back history={this.props.history}>back</Back>
									<h4 className="movie-title">{movie.title}</h4>
									<img className="img-fluid movie-image" src={movie.image_url} alt=""/>
									
									<div className="movie-body">
										<div className="movie-info">
											<div className="movie-stat">
												<strong>Genre: </strong>
												<i>{movie.genre && movie.genre.name}</i>
											</div>

											<div className="movie-stat">
												<strong>Visits: </strong>
												<i>{movie.visits}</i>
											</div>
										</div>

										<p className="movie-description">{movie.description}</p>
									</div>
								</div>
								</>
							)
						}
						</div>

						<div className="col-md-4 sidebar">Sidebar</div>
					</div>
				</div>
			);
    }
}

Movie.propTypes = {
	loading: PropTypes.bool.isRequired,
	movie: PropTypes.oneOfType([
		PropTypes.oneOf([null, undefined]).isRequired,
		PropTypes.object.isRequired
	])
}

export default withRouter(Movie);