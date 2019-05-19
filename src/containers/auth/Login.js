import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { logIn } from '../../store/actions/AuthActions';
import { toast } from 'react-toastify';
import Spinner from 'component/Spinner';
import './style.scss';

class Login extends Component {
  state = {
    email: '',
    password: '',
    loading: false
  };

  handleInputChange = field => event => this.setState({
    [field]: event.target.value
  });

  submit = event => {
    event.preventDefault();

    let logInData = {
      email: this.state.email,
      password: this.state.password
    };

    this.setState({ loading: true }, () => {
      this.props.logIn(logInData).then(res => {
        window.location.replace("/home");
      }).catch(err => {
        toast.error(err.message);
        this.setState({ loading: false })
      })
    })
  };

  componentWillMount = () => {
    if(this.props.user) {
      this.props.history.push('/home');
    }
  }

  render() {
    return (
      <div className="auth-page container">
        <div className="row full-width">
          <div className="col-sm-8 col-lg-6 mx-auto">
            <form onSubmit={this.submit}>
              <h2>Log In</h2>
              
              <fieldset disabled={this.state.loading}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Email"
                    className="form-control"
                    value={this.state.email}
                    onChange={this.handleInputChange('email')}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-control"
                    value={this.state.password}
                    onChange={this.handleInputChange('password')}
                  />
                </div>

                <div className="signup-text">
                  <span>Don't have an account yet?</span>
                  <Link to="/register">Register</Link>
                </div>

                <div className="form-submit">
                  <input className="btn btn-primary" type="submit" value="Log in" />
                  <Spinner show={this.state.loading} />
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authUser
  };
};

const mapDispatchToProps = {
  logIn
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
);