import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './style.scss';

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-light bg-light">
			  <Link className="navbar-brand" to="/">Pocket IMDb</Link>

			  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
			    <span className="navbar-toggler-icon"></span>
			  </button>

			  <div className="collapse navbar-collapse" id="navbar">
			    <ul className="navbar-nav ml-auto">
			      <li className="nav-item">
			        <Link className="nav-link" to="/home">Home</Link>
			      </li>

			      <li className="nav-item">
			        <Link className="nav-link" to="/register">Register</Link>
			      </li>

			      <li className="nav-item">
			        <Link className="nav-link" to="/login">Login</Link>
			      </li>
			    </ul>
			  </div>
			</nav>
        );
    }
}

export default Navbar;
