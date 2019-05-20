import React, { Component } from 'react';
import { setWatched, removeFromWatchlist } from 'store/actions/WatchlistActions';
import { connect } from 'react-redux';
import './style.scss';

class Controls extends Component {
  handleWatched = () => {
    this.props.setWatched(this.props.movie.id);
  }

  handleRemove = () => {
    this.props.removeFromWatchlist(this.props.movie.id);
  }

  render() {
    const color = this.props.isWatched ?
      "btn-outline-info" :
      "btn-outline-primary"

    return (
      <div className="watchlist-controls">
        <button 
        onClick={this.handleRemove}
        className="btn btn-sm btn-outline-secondary">Remove</button>

        <button 
        onClick={this.handleWatched}
        disabled={this.props.isWatched}
        className={`btn btn-sm ${color}`}>
          {this.props.isWatched ? 'Watched' : 'Mark as watched'}
        </button>
      </div>
    );
  }
}

function isWatched(active, watchlist) {
  return watchlist.some(({ id, pivot }) => {
    return active.id === id && pivot.watched;
  })
}

const mapStateToProps = ({ watchlist }, { movie }) => {
  return {
    isWatched: isWatched(movie, watchlist.all)
  };
}

const mapDispatchToPros = {
  removeFromWatchlist,
  setWatched
}

export default connect(
  mapStateToProps,
  mapDispatchToPros
)(Controls);