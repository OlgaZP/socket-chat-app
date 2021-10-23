import axios from 'axios';
import { io } from 'socket.io-client';
import {
  createMessageError,
  createMessageSuccess,
} from '../actions/actionCreators';
import store from './../store';

const axiosOptions = {
  baseURL: 'http://192.168.1.148:5000/api',
};

const http = axios.create(axiosOptions);

export const getMessages = () => http.get('/messages');

const socket = io('ws://192.168.1.148:5000');

const SOCKET_EVENTS = {
  NEW_MESSAGE: 'NEW_MESSAGE',
  NEW_MESSAGE_ERROR: 'NEW_MESSAGE_ERROR',
};

export const createMessage = data => {
  socket.emit(SOCKET_EVENTS.NEW_MESSAGE, data);
};

socket.on(SOCKET_EVENTS.NEW_MESSAGE, newMessage => {
  store.dispatch(createMessageSuccess(newMessage));
});

socket.on(SOCKET_EVENTS.NEW_MESSAGE_ERROR, err => {
  store.dispatch(createMessageError(err));
});
