import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import MovieStats from 'component/MovieStats';
import MoviesWidget from 'component/MoviesWidget';
import Back from 'component/back';
import './style.scss';

class Movie extends Component {
	componentDidMount = () => {
		window.scrollTo(0, 0);
	}

    render() {
    	const {movie} = this.props;
		
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
										<div className="movie-header">
											<h4 className="movie-title">{movie.title}</h4>
											<Back history={this.props.history}>back</Back>
										</div>

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

						<div className="col-lg-4 sidebar">
							<MoviesWidget  
							title={"Similar movies"}
							movies={this.props.similar}
							withGenre />
						</div>
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