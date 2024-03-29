import ACTION_TYPES from '../actions/actionTypes';
import { produce } from 'immer';

const initialState = {
  messages: [],
  isFetching: false,
  error: null,
  limit: 20,
};

const messageReducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case ACTION_TYPES.GET_MESSAGES_REQUEST:
    case ACTION_TYPES.CREATE_MESSAGE_REQUEST: {
      // return { ...state, error: null, isFetching: true };
      return produce(state, draftState => {
        draftState.error = null;
        draftState.isFetching = true;
      });
    }
    case ACTION_TYPES.GET_MESSAGES_SUCCESS: {
      const { payload: messages } = action;
      const newMessages = [...messages].reverse();
      return {
        ...state,
        messages: newMessages,
        isFetching: false,
      };
    }
    case ACTION_TYPES.CREATE_MESSAGE_SUCCESS: {
      const { payload: newMessage } = action;
      const { messages, limit } = state;

      const newMessages = [...messages, newMessage];

      if (newMessages.length > limit) {
        newMessages.shift();
      }

      return { ...state, messages: newMessages, isFetching: false };
    }
    case ACTION_TYPES.GET_MESSAGES_ERROR:
    case ACTION_TYPES.CREATE_MESSAGE_ERROR: {
      const { payload } = action;
      // return { ...state, isFetching: false, error: payload };
      return produce(state, draftState => {
        draftState.isFetching = false;
        draftState.error = payload;
      });
    }
    default:
      return state;
  }
};

export default messageReducer;
