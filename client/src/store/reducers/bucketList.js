import * as actionTypes from '../actions/actionTypes';

const initialState = {
  toggleForm: false,
  toggleModal: false,
  fetching: false,
  creating: false,
  fetchError: null,
  createError: null,
  showFetchError: false,
  showCreateError: false,
  showSuccess: false,
  successMessage: null,
  bucketLists: [],
  markingGoals: [],
  processingBucket: [],
  goalProcessErrors: [],
  goalProcessSuccess: [],
  bucketProcessSuccess: [],
  bucketProcessErrors: []
};

const unMutatedStateUpdate = (state, properties) => ({ ...state, ...properties });

const toggleForm = state =>
  unMutatedStateUpdate(state, { toggleForm: !state.toggleForm });
const showFetchLoader = state => unMutatedStateUpdate(state, { fetching: true });
const toggleModal = state =>
  unMutatedStateUpdate(state, { toggleModal: !state.toggleModal });
const fetchSuccess = (state, action) =>
  unMutatedStateUpdate(state, {
    bucketLists: action.data,
    fetching: false,
    fetchError: null,
    showFetchError: false
  });
const fetchFail = (state, action) =>
  unMutatedStateUpdate(state, {
    fetching: false,
    fetchError: action.message,
    showFetchError: true
  });
const hideFetchError = state =>
  unMutatedStateUpdate(state, {
    showFetchError: false
  });
const showCreateLoader = state => unMutatedStateUpdate(state, { creating: true });
const createFail = (state, action) =>
  unMutatedStateUpdate(state, {
    creating: false,
    createError: action.message,
    showFetchError: true,
    successMessage: null,
    showSuccess: false
  });
const hideCreateError = state =>
  unMutatedStateUpdate(state, {
    showFetchError: false
  });
const recordSuccess = (state, action) =>
  unMutatedStateUpdate(state, {
    creating: false,
    createError: null,
    showFetchError: false,
    successMessage: action.message,
    showSuccess: true,
    toggleForm: false
  });
const hideSuccessMessage = state =>
  unMutatedStateUpdate(state, {
    showSuccess: false
  });
const initiateMarking = (state, { listId, goalId }) => {
  const markingGoals = [...state.markingGoals];
  const index = markingGoals.findIndex(
    status => status.listId === listId && status.goalId === goalId
  );
  if (index < 0) markingGoals.push({ listId, goalId });
  return unMutatedStateUpdate(state, { markingGoals });
};
const stopMarking = (state, { listId, goalId }) => {
  const markingGoals = [...state.markingGoals];
  const index = markingGoals.findIndex(
    status => status.listId === listId && status.goalId === goalId
  );
  if (index !== -1) markingGoals.splice(index, 1);
  return unMutatedStateUpdate(state, { markingGoals });
};
const markedSuccess = (state, { listId, goalId }) => {
  const bucketLists = [...state.bucketLists];
  const goalProcessSuccess = [...state.goalProcessSuccess];
  const listIndex = bucketLists.findIndex(list => list._id === listId);
  const bucketList = { ...bucketLists[listIndex] };
  const goals = [...bucketList.goals];
  const goalIndex = goals.findIndex(goal => goal._id === goalId);
  const markedGoal = {
    ...goals[goalIndex],
    status: goals[goalIndex].status === 'completed' ? 'pending' : 'completed'
  };
  goals.splice(goalIndex, 1, markedGoal);
  bucketLists.splice(listIndex, 1, { ...bucketList, goals });
  goalProcessSuccess.push({
    listId,
    goalId,
    message: "Successfully updated goal's status"
  });
  return unMutatedStateUpdate(state, { bucketLists, goalProcessSuccess });
};
const markedFail = (state, { listId, goalId }) => {
  const goalProcessErrors = [...state.goalProcessErrors];
  const index = goalProcessErrors.findIndex(
    status => status.listId === listId && status.goalId === goalId
  );
  if (index < 0)
    goalProcessErrors.push({ listId, goalId, message: "Unable to update goal's status" });
  return unMutatedStateUpdate(state, { goalProcessErrors });
};
const deleteGoalSuccess = (state, { listId, goalId }) => {
  const bucketLists = [...state.bucketLists];
  const goalProcessSuccess = [...state.goalProcessSuccess];
  const listIndex = bucketLists.findIndex(list => list._id === listId);
  const bucketList = { ...bucketLists[listIndex] };
  const goals = [...bucketList.goals];
  const goalIndex = goals.findIndex(goal => goal._id === goalId);
  goals.splice(goalIndex, 1);
  bucketLists.splice(listIndex, 1, { ...bucketList, goals });
  goalProcessSuccess.push({
    listId,
    goalId,
    message: 'Successfully deleted a goal'
  });
  return unMutatedStateUpdate(state, { bucketLists, goalProcessSuccess });
};
const deleteGoalFail = (state, { listId, goalId }) => {
  const goalProcessErrors = [...state.goalProcessErrors];
  const index = goalProcessErrors.findIndex(
    status => status.listId === listId && status.goalId === goalId
  );
  if (index < 0)
    goalProcessErrors.push({ listId, goalId, message: 'Unable to delete goal' });
  return unMutatedStateUpdate(state, { goalProcessErrors });
};
const destroyError = (state, { listId, goalId }) => {
  const goalProcessErrors = [...state.goalProcessErrors];
  const index = goalProcessErrors.findIndex(
    err => err.listId === listId && err.goalId === goalId
  );
  goalProcessErrors.splice(index, 1);
  return unMutatedStateUpdate(state, { goalProcessErrors });
};
const destroySuccessMsg = (state, { listId, goalId }) => {
  const goalProcessSuccess = [...state.goalProcessSuccess];
  const index = goalProcessSuccess.findIndex(
    msg => msg.listId === listId && msg.goalId === goalId
  );
  goalProcessSuccess.splice(index, 1);
  return unMutatedStateUpdate(state, { goalProcessSuccess });
};
const initiateBucketProcess = (state, { listId }) => {
  const processingBucket = [...state.processingBucket];
  const index = processingBucket.findIndex(id => id === listId);
  if (index < 0) processingBucket.push(listId);
  return unMutatedStateUpdate(state, { processingBucket });
};
const stopBucketProcess = (state, { listId }) => {
  const processingBucket = [...state.processingBucket];
  const index = processingBucket.findIndex(id => id === listId);
  if (index !== -1) processingBucket.splice(index, 1);
  return unMutatedStateUpdate(state, { processingBucket });
};
const deleteBucketSuccess = (state, { listId }) => {
  const bucketLists = [...state.bucketLists];
  const bucketProcessSuccess = [...state.bucketProcessSuccess];
  const listIndex = bucketLists.findIndex(list => list._id === listId);
  bucketLists.splice(listIndex, 1);
  bucketProcessSuccess.push({
    listId,
    message: 'Successfully deleted a bucket list'
  });
  return unMutatedStateUpdate(state, { bucketLists, bucketProcessSuccess });
};
const destroyBucketSucMsg = (state, { listId }) => {
  const bucketProcessSuccess = [...state.bucketProcessSuccess];
  const index = bucketProcessSuccess.findIndex(msg => msg.listId === listId);
  bucketProcessSuccess.splice(index, 1);
  return unMutatedStateUpdate(state, { bucketProcessSuccess });
};
const destroyBucketErrMsg =(state, { listId }) => {
  const bucketProcessErrors = [...state.bucketProcessErrors];
  const index = bucketProcessErrors.findIndex(msg => msg.listId === listId);
  bucketProcessErrors.splice(index, 1);
  return unMutatedStateUpdate(state, {bucketProcessErrors });
};
const deleteBucketFail = (state, { listId }) => {
  const bucketProcessErrors = [...state.bucketProcessErrors];
  const index = bucketProcessErrors.findIndex(status => status.listId === listId);
  if (index < 0)
    bucketProcessErrors.push({ listId, message: 'Unable to delete bucket list' });
  return unMutatedStateUpdate(state, { bucketProcessErrors });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DASH_CLOSE_FORM:
      return toggleForm(state);
    case actionTypes.DASH_CLOSE_MODAL:
      return toggleModal(state);
    case actionTypes.FETCH_LIST_START:
      return showFetchLoader(state);
    case actionTypes.FETCH_LIST_SUCCESS:
      return fetchSuccess(state, action);
    case actionTypes.FETCH_LIST_FAIL:
      return fetchFail(state, action);
    case actionTypes.FETCH_TOGGLE_ERROR_DISPLAY:
      return hideFetchError(state);
    case actionTypes.CREATE_LIST_START:
      return showCreateLoader(state);
    case actionTypes.CREATE_LIST_FAIL:
      return createFail(state, action);
    case actionTypes.CREATE_TOGGLE_ERROR_DISPLAY:
      return hideCreateError(state);
    case actionTypes.SUCCESS_MESSAGE:
      return recordSuccess(state, action);
    case actionTypes.TOGGLE_SUCCESS_MESSAGE_DISPLAY:
      return hideSuccessMessage(state);
    case actionTypes.START_MARKING_GOAL:
      return initiateMarking(state, action);
    case actionTypes.MARKED_GOAL_END:
      return stopMarking(state, action);
    case actionTypes.MARKED_GOAL_SUCCESS:
      return markedSuccess(state, action);
    case actionTypes.MARKED_GOAL_FAIL:
      return markedFail(state, action);
    case actionTypes.DELETE_GOAL_SUCCESS:
      return deleteGoalSuccess(state, action);
    case actionTypes.DELETE_GOAL_FAIL:
      return deleteGoalFail(state, action);
    case actionTypes.CLEAR_GOAL_FAIL:
      return destroyError(state, action);
    case actionTypes.CLEAR_GOAL_SUCCESS:
      return destroySuccessMsg(state, action);
    case actionTypes.BUCKET_START:
      return initiateBucketProcess(state, action);
    case actionTypes.BUCKET_END:
      return stopBucketProcess(state, action);
    case actionTypes.DELETE_BUCKET_SUCCESS:
      return deleteBucketSuccess(state, action);
    case actionTypes.DELETE_BUCKET_FAIL:
      return deleteBucketFail(state, action);
    case actionTypes.CLEAR_BUCKET_SUCCESS:
      return destroyBucketSucMsg(state, action);
    case actionTypes.CLEAR_BUCKET_ERROR:
      return destroyBucketErrMsg(state, action);
    default:
      return state;
  }
};

export default reducer;
