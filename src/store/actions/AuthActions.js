import { AUTH_USER } from 'store/types';
import axios from 'axios';
import config from 'config';
import AuthService from 'services/AuthService';

const AUTH_URL = config.API_BASE_URL + '/api/auth';

export const register = registerData => {
  return async dispatch => {
    try {
      const res = await AuthService.signup(registerData);
      return res.data;
    } catch (error) {
      throw new Error("Registration failed. Please try again.")
      // dispatch({ type: REGISTER_ERROR, payload: error })
    }
  }
};

export const logIn = logInData => {
  return async dispatch => {
    try {
      const res = await AuthService.login(logInData);
      return res.data;
    } catch (error) {
      // dispatch({ type: LOGIN_ERROR, payload: error })
      throw new Error("Wrong email or password");
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