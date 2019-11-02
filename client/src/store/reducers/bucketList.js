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
  bucketLists: []
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
    default:
      return state;
  }
};

export default reducer;
