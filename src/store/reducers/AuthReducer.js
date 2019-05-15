import { AUTH_USER } from 'store/types';
import AuthService from '../../services/AuthService';

const authReducer = (state = AuthService.isAuthenticated(), action) => {
  switch (action.type) {
    case AUTH_USER:
      return action.payload;
    default:
      return state;
  }
};

export default authReducer;
