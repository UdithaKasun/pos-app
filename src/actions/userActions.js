import {
  AUTHENTICATE_USER,
  AUTHENTICATE_USER_SUCCESS,
  AUTHENTICATE_USER_FAILURE,
  VERIFY_TOKEN,
  VERIFY_TOKEN_SUCCESS,
  VERIFY_TOKEN_FAILURE,
  LOG_OUT_USER
} from "./actionTypes";

import UserService from "../services/User.service";

export const authenticateUserBegin = () => ({
  type: AUTHENTICATE_USER
});

export const authenticateUserSuccess = token => ({
  type: AUTHENTICATE_USER_SUCCESS,
  payload: { token }
});

export const authenticateUserFailure = error => ({
  type: AUTHENTICATE_USER_FAILURE,
  payload: { error }
});

export const authenticateUser = (username, password) => {
  return async dispatch => {
    dispatch(authenticateUserBegin());
    try {
      const { data } = await UserService.authenticateUser(username, password);
      localStorage.setItem("token", data.token);
      dispatch(authenticateUserSuccess(data.token));
    } catch (err) {
      dispatch(authenticateUserFailure(err.response.data));
    }
  };
};

export const verifyTokenBegin = () => ({
  type: VERIFY_TOKEN
});

export const verifyTokenSuccess = token => ({
  type: VERIFY_TOKEN_SUCCESS,
  payload: { token }
});

export const verifyTokenFailure = error => ({
  type: VERIFY_TOKEN_FAILURE,
  payload: { error }
});

export const verfiyToken = token => {
  return async dispatch => {
    dispatch(verifyTokenBegin());
    try {
      await UserService.verifyToken(token);
      dispatch(verifyTokenSuccess(token));
    } catch (err) {
      dispatch(verifyTokenFailure(err));
    }
  };
};

export const logOutUser = () => ({
  type: LOG_OUT_USER
});

export const logout = () => {
  return async dispatch => {
    localStorage.removeItem("token");
    dispatch(logOutUser());
  };
};
