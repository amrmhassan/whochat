import * as c from '../constants/roomConstants';

export const getMyRoomsReducer = (state = { rooms: [] }, action) => {
  switch (action.type) {
    case c.GET_MY_ROOMS_REQUEST:
      return { loading: true };
    case c.GET_MY_ROOMS_SUCCESS:
      return { loading: false, rooms: action.payload };
    case c.GET_MY_ROOMS_FAIL:
      return { loading: false, err: action.payload };
    case c.UPDATE_ROOM_PUT_UP:
      let roomId = action.payload._id;
      let rooms = [...state.rooms].filter((room) => room._id !== roomId);
      rooms.unshift(action.payload);
      return { ...state, rooms };
    case c.UPDATE_ROOMS_AFTER_DELETING:
      const roomIdToDelete = action.payload;

      const roomsAfterDeleting = [...state.rooms].filter(
        (room) => room._id !== roomIdToDelete
      );
      return { ...state, rooms: roomsAfterDeleting };
    case c.GET_MY_ROOMS_RESET:
      return {};

    default:
      return state;
  }
};

export const createRoomReducer = (state = {}, action) => {
  switch (action.type) {
    case c.CREATE_ROOM_REQUEST:
      return { loading: true };
    case c.CREATE_ROOM_SUCCESS:
      return { loading: false, room: action.payload, success: true };
    case c.CREATE_ROOM_FAIL:
      return { loading: false, err: action.payload };
    case c.CREATE_ROOM_RESET:
      return {};
    default:
      return state;
  }
};
export const acceptRoomReducer = (state = {}, action) => {
  switch (action.type) {
    case c.HANDLE_ACCEPT_ROOM_REQUEST:
      return { loading: true };
    case c.HANDLE_ACCEPT_ROOM_SUCCESS:
      return { loading: false, room: action.payload, success: true };
    case c.HANDLE_ACCEPT_ROOM_FAIL:
      return { loading: false, err: action.payload };
    case c.HANDLE_BLOCK_ROOM_RESET:
      return {};
    default:
      return state;
  }
};

export const currentOpenRoomReducer = (
  state = { currentOpenRoomId: '', currentOpenRoom: {} },
  action
) => {
  switch (action.type) {
    case c.CURRENT_OPEN_ROOM_REQUEST:
      return { loading: true };
    case c.CURRENT_OPEN_ROOM_SUCCESS:
      return {
        currentOpenRoom: action.payload,
        loading: false,
        success: true,
        currentOpenRoomId: action.payload._id,
      };
    case c.CURRENT_OPEN_ROOM_FAIL:
      return { loading: false, err: action.payload };
    case c.CURRENT_OPEN_ROOM_RESET:
      return {};
    case c.UPDATE_CURRENT_OPEN_ROOM:
      return { ...state, currentOpenRoom: action.payload };
    case c.TYPING_MESSAGE:
      return { ...state, typing: action.payload };
    //   let currentOpenRoom = { ...state.currentOpenRoom };
    //   let userToShowOnRoom = { ...currentOpenRoom }.userToShowOnRoom;
    //   userToShowOnRoom = { ...userToShowOnRoom, typing: action.payload };
    //   currentOpenRoom = { ...currentOpenRoom, userToShowOnRoom };
    //   return { ...state, currentOpenRoom };

    default:
      return state;
  }
};

export const deleteRoomReducer = (state = {}, action) => {
  switch (action.type) {
    case c.DELETE_ROOM_REQUEST:
      return { loading: true };
    case c.DELETE_ROOM_SUCCESS:
      return { loading: false, room: action.payload, success: true };
    case c.DELETE_ROOM_FAIL:
      return { loading: false, err: action.payload };
    case c.DELETE_ROOM_RESET:
      return {};
    default:
      return state;
  }
};
