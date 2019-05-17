import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import MovieStats from 'component/MovieStats';
import Back from 'component/back';
import './style.scss';

class Movie extends Component {
	componentDidMount = () => {
		window.scrollTo(0, 0);
	}

    render() {
    	const {movie} = this.props;
		
		// if(loading) {
		// 	return <div className="container center">
		// 		<div className="spinner-border" role="status">
		// 		  <span className="sr-only">Loading...</span>
		// 		</div>
		// 	</div>
		// }

		return (
			<div className="container movie-single">
				<div className="row">
					<div className="col-lg-8 main-content">
					{
						!movie ? (
								<div className="not-found">
									<h1 className="display-4">Movie not found</h1>
								</div>
							) : (
								<>
								<div className="movie">
									<Back history={this.props.history}>back</Back>
									<h4 className="movie-title">{movie.title}</h4>
									<img className="img-fluid movie-image" src={movie.image_url} alt=""/>
									
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
								</div>
								</>
							)
						}
						</div>

						<div className="col-lg-4 sidebar">Sidebar</div>
					</div>
				</div>
			);
    }
}

Movie.propTypes = {
	// loading: PropTypes.bool.isRequired,
	movie: PropTypes.oneOfType([
		PropTypes.oneOf([null, undefined]).isRequired,
		PropTypes.object.isRequired
	])
}

export default withRouter(Movie);