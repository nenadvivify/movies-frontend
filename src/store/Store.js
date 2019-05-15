import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import rootReducer from './reducers';
import reduxThunk from 'redux-thunk';

const history = createBrowserHistory();
const store = createStore(
  rootReducer(history),
  applyMiddleware(routerMiddleware(history), reduxThunk)
);


export default store;
