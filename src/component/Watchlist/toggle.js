import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleShowWatched } from 'store/actions/WatchlistActions';

class Toggle extends Component {
  render() {
    return (
      <div className="custom-control custom-switch">
        <input 
        type="checkbox" 
        onChange={this.props.toggleShowWatched}
        checked={this.props.show} 
        className="custom-control-input" 
        id="show-watched" />

        <label className="custom-control-label" htmlFor="show-watched"></label>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    show: state.showWatched
  }
}

const mapDispatchToProps = {
  toggleShowWatched
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toggle)