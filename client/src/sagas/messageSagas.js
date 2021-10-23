import { put } from 'redux-saga/effects';
import {
  createMessageError,
  createMessageRequest,
  createMessageSuccess,
  getMessagesError,
  getMessagesRequest,
  getMessagesSuccess,
} from '../actions/actionCreators';
import * as API from './../api';

export function * getMessagesSaga (action) {
  yield put(getMessagesRequest());
  try {
    const {
      data: { data: messages },
    } = yield API.getMessages();
    yield put(getMessagesSuccess(messages));
  } catch (err) {
    yield put(getMessagesError(err));
  }
}

export function * createMessagesSaga (action) {
  const { payload } = action;
  yield put(createMessageRequest());
  try {
    yield API.createMessage(payload);
    // yield put(createMessageSuccess(createdMessage));
  } catch (err) {
    yield put(createMessageError(err));
  }
}
