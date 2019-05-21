import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from 'store/actions/AuthActions';
import { toast } from 'react-toastify';
import './style.scss';

class Navbar extends Component {
  handleLogout = () => {
    this.props.logOut().then(res => {
      window.location.replace('/login');
    }).catch(err => {
      toast.error("Something went wrong.");
    })
  }

  userLinks = () => {
    const href = "#";

    return <Fragment>
      <li className="nav-item">
        <Link className="nav-link" to="/home">Home</Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/movies/create">Create</Link>
      </li>

      <li className="nav-item">
        <a 
        onClick={this.handleLogout}
        className="nav-link" 
        href={href}>Logout</a>
      </li>
    </Fragment>
  }

  guestLinks = () => {
    return <Fragment>
      <li className="nav-item">
        <Link className="nav-link" to="/register">Register</Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/login">Login</Link>
      </li>
    </Fragment>
  }

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top">
        <Link className="navbar-brand" to="/home">Pocket imdb</Link>

        <button 
        type="button" 
        className="navbar-toggler" 
        data-toggle="collapse" 
        data-target="#navbar" 
        aria-controls="navbar" 
        aria-expanded="false" 
        aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav ml-auto">
            {
              this.props.user ? 
                this.userLinks() :
                this.guestLinks()
            }
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = null
const mapDispatchToProps = { logOut };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar)