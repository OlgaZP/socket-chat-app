import ACTION_TYPES from '../actions/actionTypes';

const initialState = {
  messages: [],
  isFetching: false,
  error: null,
  limit: 20,
};

const messageReducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    default:
      return state;
  }
};

export default messageReducer;
