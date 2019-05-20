import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToWatchlist } from 'store/actions/WatchlistActions';
import './style.scss';

class AddToWatchlist extends Component {
  handleClick = () => {
    this.props.addToWatchlist(this.props.movie.id);
  }

  render() {
    const { isAdded, isWatched } = this.props;

    let color = "btn-outline-primary";
    let text = "Add to watchlist";

    if(isWatched) {
      color = "btn-outline-info";
      text = "Watched";
    } else if(isAdded) {
      color = "btn-outline-primary";
      text = "Added to watchlist";
    }

    return (
      <button
      onClick={this.handleClick} 
      disabled={isAdded || isWatched}
      className={`btn btn-sm ${color}`}>{text}</button>
    );
  }
}

function isAdded(active, watchlist) {
  return watchlist.some(({ id }) => active.id === id)
}

function isWatched(active, watchlist) {
  return watchlist.some(({ id, pivot }) => active.id === id && pivot.watched)
}

const mapStateToProps = ({ movies: { active }, watchlist }) => {
  return {
    isAdded: isAdded(active, watchlist.all),
    isWatched: isWatched(active, watchlist.all)
  }
}

const mapDispatchToProps = {
  addToWatchlist
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddToWatchlist)