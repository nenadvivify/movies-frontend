import React, { Component } from 'react';
import moment from 'moment';
import "./style.scss";

class Comments extends Component {
  displayComments = () => {
    const { comments } = this.props;

    if(!comments || !comments.length) {
      return <div className="no-comments">No comments found</div>
    }

    return this.props.comments.map(comment => {
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

  render() {
    return (
      <div className="comments">
        <div className="comments-body">
          {this.displayComments()}
        </div>
      </div>
    );
  }
}

export default Comments;