import * as actionTypes from '../actions/actionTypes';

const initialState = {
  toggleForm: false,
  toggleModal: false,
  loading: false,
  bucketLists: [
    {
      _id: 1,
      name: 'Goals for the remaining of 2019',
      goals: [
        {
          _id: 1,
          text: 'I would like to visit the bahamas',
          tracking: false,
          from: null,
          to: null,
          status: 'pending',
          created_on: '23-10-2019'
        },
        {
          _id: 2,
          text: 'I would like to visit the china',
          tracking: true,
          from: '26-10-2019',
          to: '30-10-2019',
          status: 'done',
          created_on: '23-10-2019'
        }
      ],
      created_on: '23-10-2019'
    },
    {
      _id: 2,
      name: 'Goals for 2020',
      goals: [
        {
          _id: 1,
          text: 'I would buy a brand new car',
          tracking: false,
          from: null,
          to: null,
          status: 'pending',
          created_on: '24-10-2019'
        },
        {
          _id: 2,
          text: 'I would buy a new house',
          tracking: true,
          from: '01-01-2020',
          to: '30-10-2020',
          status: 'pending',
          created_on: '24-10-2019'
        }
      ],
      created_on: '24-10-2019'
    }
  ]
};

const unMutatedStateUpdate = (state, properties) => ({ ...state, ...properties });

const toggleForm = state =>
  unMutatedStateUpdate(state, { toggleForm: !state.toggleForm });
  
const toggleModal = state =>
  unMutatedStateUpdate(state, { toggleModal: !state.toggleModal });
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DASH_CLOSE_FORM:
      return toggleForm(state);
    case actionTypes.DASH_CLOSE_MODAL:
      return toggleModal(state);
    default:
      return state;
  }
};

export default reducer;
