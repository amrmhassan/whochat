import * as c from '../constants/socketConstants';
import * as urls from '../constants/urls';
import socketIOClient from 'socket.io-client';

export const createSocketAction = () => (dispatch, getState) => {
  const loginUser = getState().loginUser.user;
  const socket = socketIOClient.connect(urls.host, {
    query: { id: loginUser._id },
  });

  dispatch({
    type: c.CREATE_SOCKET,
    payload: socket,
  });
};
