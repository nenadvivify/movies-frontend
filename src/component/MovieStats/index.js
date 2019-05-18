import React, { Component } from 'react';
import { connect } from 'react-redux';
import { voteMovie } from 'store/actions/MovieActions'
import './style.scss';

class MovieStats extends Component {
  handleVote = type => {
    const movie_id = this.props.movie.id;
    const body = { type, movie_id }
    this.props.voteMovie(body)
  }

  render() {
    const movie = this.props.movie;

    return (
      <div className="movie-stats">
        <div className="icon-field visits">
          <i className="fa fa-eye" aria-hidden="true"></i>
          <span>{movie.visits}</span>
        </div>

        <div className="icon-field likes">
          <i 
          onClick={() => this.handleVote('like')} 
          className="fa fa-thumbs-o-up likes-icon vote-button" 
          aria-hidden="true"></i>

          <span>{movie.likes}</span>
        </div>

        <div className="icon-field dislikes">
          <i 
          onClick={() => this.handleVote('dislike')} 
          className="fa fa-thumbs-o-down dislikes-icon vote-button" 
          aria-hidden="true"></i>
          <span>{movie.dislikes}</span>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  voteMovie
};

export default connect(
  null,
  mapDispatchToProps
)(MovieStats)