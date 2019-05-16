import { LOGIN, AUTH_USER, REGISTER, LOGIN_ERROR, REGISTER_ERROR } from 'store/types';
import axios from 'axios';
import config from 'config';

const AUTH_URL = config.API_BASE_URL + '/api/auth';

export const register = registerData => {
  return async dispatch => {
    try {
      const res = await axios.post(AUTH_URL + '/register', registerData);
      dispatch({ type: REGISTER, payload: res.data });
      return res.data;
    } catch (error) {
      dispatch({ type: REGISTER_ERROR, payload: error })
    }
  }
};

export const logIn = logInData => {
  return async dispatch => {
    try {
      const res = await axios.post(AUTH_URL + '/login', logInData);
      dispatch({ type: LOGIN, payload: res.data });
      return res.data;
    } catch (error) {
      // dispatch({ type: LOGIN_ERROR, payload: error })
      // console.log(error.response.data.message)
      throw new Error("Wrong email or password");
    }
  }
};

export const authUser = logInData => {
  return async dispatch => {
    try {
      const res = await axios.post(AUTH_URL + '/me', logInData);
      dispatch({ type: AUTH_USER, payload: res.data });
      return res.data;
    } catch (error) {
      console.log('Auth failed')
    }
  }
};