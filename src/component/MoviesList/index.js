import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import MoviesWidget from 'component/MoviesWidget';
import MovieCard from 'component/MovieCard';
import Pagination from 'component/Pagination';
import Filters from 'component/Filters';
import Search from 'component/Search';
import Spinner from 'component/Spinner';
import './style.scss';

class MoviesList extends Component {
  handlePageChange = page => {
    this.props.history.push(`/home/${page}`);
    window.scrollTo(0, 0);
  }

  renderMovies = () => {
    const { movies } = this.props;

    if(!movies.length) {
      return <div className="movies-empty">
        <h1 className="display-4">Nothing found</h1>
      </div>
    }

    return movies.map(movie => (
      <MovieCard 
      key={movie.id} 
      movie={movie} />
    ))
  }

  renderContent = () => {
    if(this.props.loading.movies) {
      return <div className="movies-content-loading">
        <Spinner show />
      </div>
    }

    return (
      <Fragment>
        <div className="row">
          {this.renderMovies()}
        </div>

        <div className="row">
          <Pagination 
          total={this.props.total}
          current={this.props.match.params.page}
          onChange={this.handlePageChange}
          pageSize={10} />
        </div>  
      </Fragment>
    )
  }

  renderSidebar = () => {
    if(this.props.loading.movies) {
      return <div className="movies-sidebar-loading">
        <Spinner show />
      </div>
    }

    return (
      <Fragment>
        <Search 
        searchText={this.props.searchText}
        searchMovie={this.props.searchMovie} />

        <Filters />

        <MoviesWidget 
        title="Most popular movies"
        movies={this.props.popular}
        withLikes withBadge />

        <MoviesWidget  
        withDate
        withWatchlist
        withToggleWatched
        withDescription={false}
        title={"Watchlist"}
        emptyMessage={"Empty watchlist"}
        movies={this.props.watchlist} />
      </Fragment>
    )
  }

  render() {
    return (
      <div className="container movies fluid-md">
        <div className="row movies-row">
          <div className="col-md-8 order-2 order-md-1 movies-content">
            {this.renderContent()}
          </div>

          <div className="col-md-4 order-1 order-md-2 movies-sidebar">
            {this.renderSidebar()}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(MoviesList)