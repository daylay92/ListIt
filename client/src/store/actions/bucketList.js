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
const startMarking = (listId, goalId) => ({
  type: actionTypes.START_MARKING_GOAL,
  listId,
  goalId
});
const endMarking = (listId, goalId) => ({
  type: actionTypes.MARKED_GOAL_END,
  listId,
  goalId
});
const markSuccess = (listId, goalId) => ({
  type: actionTypes.MARKED_GOAL_SUCCESS,
  listId,
  goalId
});
const markFail = (listId, goalId) => ({
  type: actionTypes.MARKED_GOAL_FAIL,
  listId,
  goalId
});
export const clearGoalError = (listId, goalId) => ({
  type: actionTypes.CLEAR_GOAL_FAIL,
  listId,
  goalId
});
export const clearGoalSuccessMsg = (listId, goalId) => ({
  type: actionTypes.CLEAR_GOAL_SUCCESS,
  listId,
  goalId
});
const deleteGoalSuccess = (listId, goalId) => ({
  type: actionTypes.DELETE_GOAL_SUCCESS,
  listId,
  goalId
});
const deleteGoalFail = (listId, goalId) => ({
  type: actionTypes.DELETE_GOAL_FAIL,
  listId,
  goalId
});
const startBucket = listId => ({
  type: actionTypes.BUCKET_START,
  listId
});
const endBucket = listId => ({
  type: actionTypes.BUCKET_END,
  listId
});
const deleteBucketFail = listId => ({
  type: actionTypes.DELETE_BUCKET_FAIL,
  listId
});
const deleteBucketSuccess = listId => ({
  type: actionTypes.DELETE_BUCKET_SUCCESS,
  listId
});
export const clearBucketError = listId => ({
  type: actionTypes.CLEAR_BUCKET_ERROR,
  listId
});
export const clearBucketSuccess = listId => ({
  type: actionTypes.CLEAR_BUCKET_SUCCESS,
  listId
});
const onToggleDisplay = (actionCreator, options = []) => dispatch => {
  setTimeout(() => dispatch(actionCreator(...options)), 7000);
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
    dispatch(fetchSuccess(data));
  } catch (err) {
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

// Marking goal as done
export const onMarkGoal = (token, listId, goalId) => async dispatch => {
  dispatch(startMarking(listId, goalId));
  const config = {
    headers: { token }
  };
  try {
    await axios.patch(`/bucketList/${listId}/goal/${goalId}`, null, config);
    dispatch(endMarking(listId, goalId));
    dispatch(markSuccess(listId, goalId));
    dispatch(onToggleDisplay(clearGoalSuccessMsg, [listId, goalId]));
  } catch (err) {
    dispatch(endMarking(listId, goalId));
    dispatch(markFail(listId, goalId));
    dispatch(onToggleDisplay(clearGoalError, [listId, goalId]));
  }
};

// Deleting Bucket
export const onDeleteGoal = (token, listId, goalId) => async dispatch => {
  dispatch(startMarking(listId, goalId));
  const config = {
    headers: { token }
  };
  try {
    await axios.delete(`/bucketList/${listId}/goal/${goalId}`, config);
    dispatch(endMarking(listId, goalId));
    dispatch(deleteGoalSuccess(listId, goalId));
    dispatch(onToggleDisplay(clearGoalSuccessMsg, [listId, goalId]));
  } catch (err) {
    dispatch(endMarking(listId, goalId));
    dispatch(deleteGoalFail(listId, goalId));
    dispatch(onToggleDisplay(clearGoalError, [listId, goalId]));
  }
};

// Deleting goal
export const onDeleteBucket = (token, listId) => async dispatch => {
  dispatch(startBucket(listId));
  const config = {
    headers: { token }
  };
  try {
    await axios.delete(`/bucketList/${listId}`, config);
    dispatch(endBucket(listId));
    dispatch(deleteBucketSuccess(listId));
    dispatch(onToggleDisplay(clearBucketSuccess, [listId]));
  } catch (err) {
    dispatch(endBucket(listId));
    dispatch(deleteBucketFail(listId));
    dispatch(onToggleDisplay(clearBucketError, [listId]));
  }
};
