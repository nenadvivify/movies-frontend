import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import MoviesWidget from 'component/MoviesWidget';
import MovieComments from 'component/MovieComments';
import MovieCommentsForm from 'component/MovieComments/form';
import MovieBody from './body';
import MovieHeader from './header';
import MoviePreview from './preview';
import './style.scss';

class Movie extends Component {
  componentDidMount = () => {
    window.scrollTo(0, 0);
  }

  notFound = () => {
    return (
      <div className="not-found">
        <h1 className="display-4">Movie not found</h1>
      </div>
    )
  }

  content = ({ movie, history }) => {
    return (
      <div className="movie">
        <MovieHeader history={history} movie={movie} />
        <MoviePreview preview={movie.image_url} />
        <MovieBody movie={movie} />
        
        <div>{movie && movie.comments && movie.comments.length} comments</div>
        <MovieCommentsForm movie={movie} />
        <MovieComments comments={movie.comments} />
      </div>
    )
  }

  render() {
    const { movie, history } = this.props;

    return (
      <div className="container movie-single">
        <div className="row">
          <div className="col-lg-8 main-content">
            {movie ? this.content({movie, history}) : this.notFound()}
          </div>

          <div className="col-lg-4 sidebar">
            <MoviesWidget  
            title={"Related movies"}
            movies={this.props.similar}
            withGenre />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Movie);