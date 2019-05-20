import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import WatchlistControls from 'component/Watchlist/controls';
import ToggleShowWatched from 'component/Watchlist/toggle';
import moment from 'moment';
import './style.scss';

class PopularMovies extends Component {
  excerpt = (string, len) => {
    return string.slice(0, len) + '...';
  }

  showMovies = () => {
    const { movies, emptyMessage } = this.props;

    if(!movies.length) {
      return <div className="empty-message">
        {emptyMessage || "Nothing found"}
      </div>
    }

    return movies.map(movie => {
      const to = '/movies/' + movie.id;

      return (
        <div key={movie.id} className="movies-widget-item media">
          <img className="media-image" src={movie.image_url} alt=""/>

          <div className="media-body">
            <div className="media-body-text">
              <Link className="media-body-title" to={to}>{movie.title}</Link>
              {
                this.props.withGenre && (
                  <div className="media-body-genre">
                    <span>Genre: </span>
                    <span>{movie.genre && movie.genre.name}</span>
                  </div>
                )
              }

              {
                this.props.withDescription !== false && (
                  <p className="media-body-description">{this.excerpt(movie.description, 65)}</p>
                )
              }

              {
                movie.pivot && this.props.withDate && (
                  <p className="media-body-description">
                    <span>Added: </span>
                    <span>{moment(movie.pivot.created_at).fromNow()}</span>
                  </p>
                )
              }

              {
                this.props.withWatchlist && (
                  <WatchlistControls movie={movie} />
                )
              }
            </div>

            {
              this.props.withLikes && (
                <div className="media-body-likes">
                  <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                  <span className="likes-value">{movie.likes}</span>
                </div>
              )
            }
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="movies-widget card">
          <div className="card-header">
          <span>{this.props.title || "Widget title"}</span>
          {
            this.props.withBadge && (
              <span className="badge badge-primary">Top {this.props.movies.length}</span>
            )
          }

          {
            this.props.withToggleWatched && (
              <ToggleShowWatched />
            )
          }
          </div>

            <div className="card-body">{this.showMovies()}</div>
        </div>
    );
  }
}

export default PopularMovies;