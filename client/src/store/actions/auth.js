import * as actionTypes from './actionTypes';
import axios from 'axios';

const authStart = () => ({ type: actionTypes.AUTH_START });

const authSuccess = (token, user) => ({
  type: actionTypes.AUTH_SUCCESS,
  token,
  user
});

const authFail = error => ({ type: actionTypes.AUTH_FAIL, error });

export const hideError = () => ({ type: actionTypes.AUTH_HIDE_ERROR });

export const authLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('expiryDate');
  return { type: actionTypes.AUTH_LOGOUT };
};
const authHideError = () => dispatch => {
  setTimeout(() => {
    dispatch(hideError());
  }, 10000);
};
const logoutExpiredToken = expiresIn => {
  return dispatch => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expiresIn);
  };
};
export const onAuth = (data, task = 'signup') => async dispatch => {
  dispatch(authStart());
  try {
    let res = null;
    if (task !== 'signup') res = await axios.post('/auth/signin', data);
    else res = await axios.post('/auth/signup', data);
    const { token, id, firstName, lastName, email } = res.data.data;
    const user = { id, firstName, lastName, email };
    const expiresIn = 7200000;
    const expiresBy = new Date(new Date().getTime() + expiresIn);
    console.log(expiresBy);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('expiryDate', expiresBy);
    dispatch(authSuccess(token, user));
    dispatch(logoutExpiredToken(expiresIn));
  } catch (err) {
    const msg = err.response
      ? err.response.data.error.message
      : 'something went wrong, please try again.';
    dispatch(authFail(msg));
    dispatch(authHideError());
  }
};
const isResourceAvailable = (token, user, expiryDate) => token && user && expiryDate;

export const syncAuthState = () => dispatch => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const expiryDate = localStorage.getItem('expiryDate');
  if (!isResourceAvailable(token, user, expiryDate)) {
    dispatch(authLogout());
    return;
  }
  const expiresBy = new Date(expiryDate);
  console.log(expiresBy);
  if (expiresBy <= new Date()) {
    dispatch(authLogout());
    return;
  }
  dispatch(authSuccess(token, JSON.parse(user)));
  const expiresIn = expiresBy.getTime() - new Date().getTime();
  dispatch(logoutExpiredToken(expiresIn));
};
