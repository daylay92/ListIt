import * as actionTypes from '../actions/actionTypes';

const initialState = {
  closeForm: false
};

const unMutatedStateUpdate = (state, properties) => ({ ...state, ...properties });

const toggleForm = state => unMutatedStateUpdate(state, { closeForm: !state.closeForm });
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DASH_CLOSE_FORM:
      return toggleForm(state);
    default:
      return state;
  }
};

export default reducer;
