import * as c from '../constants/roomConstants';
import * as urls from '../constants/urls';
import axios from 'axios';

export const getMyRoomsAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: c.GET_MY_ROOMS_REQUEST,
    });
    const token = `Bearer ${getState().loginUser.user.token}`;
    const config = {
      headers: {
        authorization: token,
      },
    };

    const {
      data: { data },
    } = await axios.get(`${urls.roomsUrl}/getMyRooms`, config);
    dispatch({
      type: c.GET_MY_ROOMS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: c.GET_MY_ROOMS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const setCurrentOpenRoomAction = (currentRoomId) => async (
  dispatch,
  getState
) => {
  const currentOpenRoomId = getState().currentOpenRoom.currentOpenRoomId;
  const currentOpenRoom = getState().currentOpenRoom.currentOpenRoom;
  if (currentRoomId === currentOpenRoomId && currentOpenRoom) {
    return;
  }
  try {
    // dispatch({
    //   type: c.CURRENT_OPEN_ROOM_REQUEST,
    // });

    const token = `Bearer ${getState().loginUser.user.token}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    };

    const {
      data: { data },
    } = await axios.get(`${urls.roomsUrl}/${currentRoomId}`, config);
    dispatch({
      type: c.CURRENT_OPEN_ROOM_SUCCESS,
      payload: data,
    });
    localStorage.setItem('currentOpenRoomId', currentRoomId);
  } catch (err) {
    dispatch({
      type: c.CURRENT_OPEN_ROOM_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

//? when any user send message we will get rooms from server again
export const updateRoomAction = (room) => async (dispatch) => {
  try {
    dispatch({
      type: c.UPDATE_ROOM_PUT_UP,
      payload: room,
    });
  } catch (err) {
    dispatch({
      type: c.GET_MY_ROOMS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const acceptRoomAction = (roomId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: c.HANDLE_ACCEPT_ROOM_REQUEST,
    });
    const token = `Bearer ${getState().loginUser.user.token}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    };

    const {
      data: { data },
    } = await axios.post(
      `${urls.roomsUrl}/acceptRoom`,
      { room: roomId },
      config
    );
    dispatch({
      type: c.HANDLE_ACCEPT_ROOM_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: c.HANDLE_ACCEPT_ROOM_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const blockRoomAction = (roomId, otherUser) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: c.HANDLE_BLOCK_ROOM_REQUEST,
    });
    const token = `Bearer ${getState().loginUser.user.token}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    };

    const {
      data: { data },
    } = await axios.post(
      `${urls.blocksUrl}`,
      { room: roomId, otherUser: otherUser },
      config
    );
    dispatch({
      type: c.HANDLE_BLOCK_ROOM_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: c.HANDLE_BLOCK_ROOM_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const unblockRoomAction = (roomId, otherUser) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: c.HANDLE_UNBLOCK_ROOM_REQUEST,
    });
    const token = `Bearer ${getState().loginUser.user.token}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    };

    const {
      data: { data },
    } = await axios.post(
      `${urls.blocksUrl}/deleteBlock`,
      { room: roomId, otherUser: otherUser },
      config
    );
    dispatch({
      type: c.HANDLE_UNBLOCK_ROOM_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: c.HANDLE_UNBLOCK_ROOM_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const updateRoomWithIdAction = (roomId) => async (
  dispatch,
  getState
) => {
  try {
    const token = `Bearer ${getState().loginUser.user.token}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    };

    const {
      data: { data },
    } = await axios.get(`${urls.roomsUrl}/${roomId}`, config);
    dispatch({
      type: c.UPDATE_ROOM_PUT_UP,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: c.HANDLE_ACCEPT_ROOM_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const updateCurrentOpenRoomAction = (acceptedRoomId) => async (
  dispatch,
  getState
) => {
  const currentOpenRoom = getState().currentOpenRoom.currentOpenRoom;

  if (currentOpenRoom && currentOpenRoom._id !== acceptedRoomId) {
    return;
  }
  try {
    const token = `Bearer ${getState().loginUser.user.token}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    };

    const {
      data: { data },
    } = await axios.get(`${urls.roomsUrl}/${acceptedRoomId}`, config);
    dispatch({
      type: c.UPDATE_CURRENT_OPEN_ROOM,
      payload: data,
    });

    localStorage.setItem('currentRoom', JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: c.HANDLE_ACCEPT_ROOM_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const deleteRoomAction = (roomId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: c.DELETE_ROOM_REQUEST,
    });
    const token = `Bearer ${getState().loginUser.user.token}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    };

    const {
      data: { data },
    } = await axios.delete(`${urls.roomsUrl}/${roomId}`, config);
    dispatch({
      type: c.DELETE_ROOM_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: c.DELETE_ROOM_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const updateRoomAfterOneDeletedAction = (roomId) => (
  dispatch,
  getState
) => {
  const currentOpenRoomId =
    getState().currentOpenRoom.currentOpenRoom &&
    getState().currentOpenRoom.currentOpenRoom._id;
  if (currentOpenRoomId === roomId) {
    localStorage.removeItem('currentRoom');
    dispatch({
      type: c.CURRENT_OPEN_ROOM_RESET,
      payload: roomId,
    });
  }

  dispatch({
    type: c.UPDATE_ROOMS_AFTER_DELETING,
    payload: roomId,
  });
};
