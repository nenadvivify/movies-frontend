import { AUTH_USER } from 'store/types';
import axios from 'axios';
import config from 'config';
import AuthService from 'services/AuthService';

const AUTH_URL = config.API_BASE_URL + '/api/auth';

function handleError(error, message) {
  const msgs = error.response.data.message;
  return typeof msgs === 'object' ?
    Object.values(msgs).pop() :
    message
}

export const register = registerData => {
  return async dispatch => {
    try {
      await AuthService.signup(registerData);
    } catch (error) {
      const message = handleError(error, 'Registration failed');
      throw new Error(message);
    }
  }
};

export const logIn = logInData => {
  return async dispatch => {
    try {
      await AuthService.login(logInData);
    } catch (error) {
      const message = handleError(error, 'Wrong email or password');
      throw new Error(message);
    }
  }
};

export const logOut = () => {
  return async dispatch => {
    try {
      return AuthService.logout()
    } catch (error) {
      throw new Error("Something went wrong.")
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