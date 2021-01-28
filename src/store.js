import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  loginUserReducer,
  userForgotPasswordReducer,
  userResetPasswordReducer,
  setCurrentChattingUserDataReducer,
  updateMeReducer,
  userVerifyEmailReducer,
  searchUsersReducer,
} from './reducers/userReducers';
import {
  getMyRoomsReducer,
  createRoomReducer,
  currentOpenRoomReducer,
} from './reducers/roomReducers';

import {
  getRoomMessagesReducer,
  createMessageReducer,
} from './reducers/messageReducers';
import { createSocketReducer } from './reducers/socketReducers';

const reducer = combineReducers({
  loginUser: loginUserReducer,
  myRooms: getMyRoomsReducer,
  createRoom: createRoomReducer,
  currentOpenRoom: currentOpenRoomReducer,
  roomMessages: getRoomMessagesReducer,
  createMessage: createMessageReducer,
  socket: createSocketReducer,
  userForgotPassword: userForgotPasswordReducer,
  userResetPassword: userResetPasswordReducer,
  currentChattingUserData: setCurrentChattingUserDataReducer,
  updateMe: updateMeReducer,
  userVerifyEmail: userVerifyEmailReducer,
  searchUsers: searchUsersReducer,
});

const loggedInUser = localStorage.getItem('loggedInUser')
  ? JSON.parse(localStorage.getItem('loggedInUser'))
  : {};
const currentChattingUserData = localStorage.getItem('currentChattingUserData')
  ? JSON.parse(localStorage.getItem('currentChattingUserData'))
  : {};

const currentRoomId = localStorage.getItem('currentOpenRoomId') || '';

let initialState = {
  loginUser: { user: loggedInUser },
  currentOpenRoom: {
    currentOpenRoomId: currentRoomId,
    currentOpenRoomData: {},
  },
  currentChattingUserData: currentChattingUserData,
};

const middleware = [thunk];
let store;
if (process.env.NODE_ENV === 'development') {
  store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
} else {
  store = createStore(reducer, initialState, applyMiddleware(...middleware));
}

export default store;
