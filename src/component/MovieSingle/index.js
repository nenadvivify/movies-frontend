import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import MoviesWidget from 'component/MoviesWidget';
import MovieComments from 'component/MovieComments';
import MovieCommentsForm from 'component/MovieComments/form';
import MovieBody from './body';
import MovieHeader from './header';
import MoviePreview from './preview';
import Spinner from 'component/Spinner';
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

  renderContent = () => {
    const { movie, history, loading } = this.props;

    if(loading.movie) {
      return <div className="movie-content-loading">
        <Spinner show />
      </div>
    }

    if(!movie) {
      return <div className="movie-empty">
        <h1 className="display-4">Movie not found</h1>
      </div>
    }

    return (
      <div className="movie">
        <MoviePreview preview={movie.image_url} />
        <MovieHeader history={history} movie={movie} />
        <MovieBody movie={movie} />
        
        <div>{movie && movie.comments && movie.comments.length} comments</div>
        <MovieCommentsForm movie={movie} />
        <MovieComments comments={movie.comments} />
      </div>
    )
  }

  renderSidebar = () => {
    return (
      <MoviesWidget  
      title={"Related movies"}
      movies={this.props.similar}
      withGenre />
    )
  }

  render() {
    return (
      <div className="container movie-single">
        <div className="row">
          <div className="col-lg-8 main-content">
            {this.renderContent()}
          </div>

          <div className="col-lg-4 sidebar">
            {this.renderSidebar()}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Movie);