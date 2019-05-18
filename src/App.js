import React, { Component, Fragment } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import createHistory from 'history/createBrowserHistory';
import AppLayout from './component/Layout';
import store from './store/Store';

const history = createHistory();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Fragment>
            <ToastContainer
            position="bottom-right"
            autoClose={4000}
            hideProgressBar={true}
            newestOnTop={false}
            rtl={false}
            closeOnClick
            pauseOnVisibilityChange
            pauseOnHover />

            <AppLayout history={history} />
          </Fragment>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;