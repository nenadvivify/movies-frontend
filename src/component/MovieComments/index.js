import React, { Component } from 'react';
import moment from 'moment';
import "./style.scss";

class Comments extends Component {
  state = {
    total: 5
  }

  loadMore = event => {
    event.preventDefault();

    this.setState(({ total }) => ({
      total: total + 5
    }))
  }

  sliceComments = () => {
    const { comments } = this.props;
    const { total } = this.state;

    return comments.slice(0, total);
  }

  displayComments = () => {
    const { comments } = this.props;

    if(!comments.length) {
      return <div className="no-comments">No comments found</div>
    }

    return this.sliceComments().map(comment => {
      return <div key={comment.id} className="comment">
        <div className="comment-header">
          <strong className="comment-author">{comment.user.name}</strong>
          <span className="comment-date">{moment(comment.created_at).fromNow()}</span>
        </div>

        <div className="comment-body">
          <p className="comment-text">{comment.body}</p>
        </div>
      </div>
    })
  }

  displayLoadMore = () => {
    const href = '#';
    const { comments } = this.props;
    const { total } = this.state;

    if(total >= comments.length) {
      return null;
    }

    return <a 
    onClick={this.loadMore}
    href={href}>Load more</a>
  }

  render() {
    if(!this.props.comments) {
      return null;
    }

    return (
      <div className="comments">
        <div className="comments-body">
          {this.displayComments()}
          {this.displayLoadMore()}
        </div>
      </div>
    );
  }
}

export default Comments;