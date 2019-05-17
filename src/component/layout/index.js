import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter, Switch } from 'react-router-dom';

import { authUser } from 'store/actions/AuthActions';
import Login from 'containers/auth/Login';
import Register from 'containers/auth/Register';
import Home from 'containers/Home';
import Navbar from 'component/Navbar';
import Footer from 'component/Footer';
import Movie from 'containers/Movie';
import NotFound from 'component/NotFound';
import './index.scss';

class AppLayout extends React.Component {
  componentDidMount() {
    if (this.props.user) {
      if(this.props.location.pathname === '/') {
        this.props.history.push('/home');
      }
    } else {
      if(!['/login', '/register'].includes(this.props.location.pathname)) {
        this.props.history.push('/login');
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      if (this.props.user) {
        this.props.history.push('/home');
      } else {
        this.props.history.push('/login');
      }
    }
  }

  render() {
    return <div>
      <Navbar user={this.props.user} />

      <main>
        <Switch>
          <Route exact path="/home/:page?" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/movies/:movieId" component={Movie} />
          <Route exact path='*' component={NotFound} />
        </Switch>
      </main>

      <Footer />
    </div>
  }
}

const mapStateToProps = state => {
  return {
    user: state.authUser
  };
};

const mapDispatchToProps = () => {
  return {
    authUser
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AppLayout)
);
