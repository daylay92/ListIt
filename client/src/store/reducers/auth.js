import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  showError: false
};

const unMutatedStateUpdate = (initialState, properties) => {
  const initStateCopy = { ...initialState };
  const user = { ...initStateCopy.user };
  const finalCopy = { ...initStateCopy, user };
  return { ...finalCopy, ...properties };
};
const authStart = state =>
  unMutatedStateUpdate(state, {
    error: null,
    showError: false,
    loading: true
  });
const authSuccess = (state, action) =>
  unMutatedStateUpdate(state, {
    loading: false,
    error: null,
    showError: false,
    token: action.token,
    user: action.user
  });
const authFail = (state, action) =>
  unMutatedStateUpdate(state, {
    loading: false,
    error: action.error,
    showError: true
  });

const authLogout = state =>
  unMutatedStateUpdate(state, {
    loading: false,
    error: null,
    token: null,
    user: null,
    showError: false
  });
const authHideError = state =>
  unMutatedStateUpdate(state, {
    showError: false
  });
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state);
    case actionTypes.AUTH_HIDE_ERROR:
      return authHideError(state);
    default:
      return state;
  }
};

export default reducer;
