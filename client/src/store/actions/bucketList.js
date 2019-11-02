import * as actionTypes from './actionTypes';
import axios from 'axios';

export const closeForm = () => ({ type: actionTypes.DASH_CLOSE_FORM });
export const closeModal = () => ({ type: actionTypes.DASH_CLOSE_MODAL });

const fetchStart = () => ({ type: actionTypes.FETCH_LIST_START });
const fetchSuccess = data => ({ type: actionTypes.FETCH_LIST_SUCCESS, data });
const fetchFail = message => ({ type: actionTypes.FETCH_LIST_FAIL, message });
export const showFetchError = () => ({ type: actionTypes.FETCH_TOGGLE_ERROR_DISPLAY });
const createStart = () => ({ type: actionTypes.CREATE_LIST_START });
const createFail = message => ({ type: actionTypes.CREATE_LIST_FAIL, message });
export const showCreateError = () => ({ type: actionTypes.CREATE_TOGGLE_ERROR_DISPLAY });
const successMessage = message => ({ type: actionTypes.SUCCESS_MESSAGE, message });
export const toggleSuccessMessage = () => ({
  type: actionTypes.TOGGLE_SUCCESS_MESSAGE_DISPLAY
});
const onToggleDisplay = actionCreator => dispatch => {
  setTimeout(() => dispatch(actionCreator()), 7000);
};
// Fetching User bucketlist
export const onFetchList = token => async dispatch => {
  dispatch(fetchStart());
  const config = {
    headers: { token }
  };
  try {
    const {
      data: { data }
    } = await axios.get('/bucketList', config);
    console.log(data);
    dispatch(fetchSuccess(data));
  } catch (err) {
    console.log(err.response);
    const msg = err.response
      ? err.response.data.error.message
      : 'something went wrong, please try again.';
    dispatch(fetchFail(msg));
    dispatch(onToggleDisplay(showFetchError));
  }
};

// Creating user bucket list
export const onCreateList = (token, data) => async dispatch => {
  dispatch(createStart());
  const config = {
    headers: { token }
  };
  try {
    await axios.post('/bucketList', data, config);
    dispatch(successMessage('Successfully created bucket list'));
    dispatch(onToggleDisplay(toggleSuccessMessage));
    dispatch(onFetchList(token));
  } catch (err) {
    const msg = err.response
      ? err.response.data.error.message
      : 'something went wrong, please try again.';
    dispatch(createFail(msg));
    dispatch(onToggleDisplay(showCreateError));
  }
};
