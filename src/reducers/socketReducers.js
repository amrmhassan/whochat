import * as c from '../constants/socketConstants';

export const createSocketReducer = (state = {}, action) => {
  switch (action.type) {
    case c.CREATE_SOCKET:
      return action.payload;
    case c.DISCONNECT_SOCKET:
      return {};
    default:
      return state;
  }
};
