import * as c from '../constants/messagesConstants';
import axios from 'axios';
import * as urls from '../constants/urls';

export const getRoomsMessagesAction = (room) => async (dispatch, getState) => {
  try {
    dispatch({
      type: c.GET_ROOM_MESSAGES_REQUEST,
    });

    const token = `Bearer ${getState().loginUser.user.token}`;
    const config = {
      headers: {
        authorization: token,
      },
    };

    const {
      data: { data },
    } = await axios.get(`${urls.messagesUrl}/getRoomMessages/${room}`, config);
    dispatch({
      type: c.GET_ROOM_MESSAGES_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: c.GET_ROOM_MESSAGES_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const createMessageAction = (messageObj) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: c.CREATE_MESSAGE_REQUEST,
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
      `${urls.messagesUrl}/createMessage`,
      messageObj,
      config
    );
    dispatch({
      type: c.CREATE_MESSAGE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: c.CREATE_MESSAGE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const markMessageAsSeen = (message) => (dispatch, getState) => {
  const currentChattingUser = getState().currentChattingUserData;
  const socket = getState().socket;
  const currentOpenRoomId = getState().currentOpenRoom.currentOpenRoomId;
  const myId = getState().loginUser.user._id;
  const senderId = message.sender; //? won't be available until it comes from the server
  const messageRoomId = message.room;
  const addOtherMessage = senderId !== myId;
  const { status } = currentChattingUser;

  if (
    addOtherMessage &&
    messageRoomId === currentOpenRoomId &&
    status.match(/online|startTyping|stopTyping/)
  ) {
    socket.emit('user-read-message', {
      message,
      senderOnlineId: currentChattingUser.onlineId,
    });
  }
};

export const updateRoomMessagesAction = (message) => async (
  dispatch,
  getState
) => {
  const currentOpenRoomId = getState().currentOpenRoom.currentOpenRoomId;
  const myId = getState().loginUser.user._id;
  const senderId = message.sender; //? won't be available until it comes from the server
  const messageRoomId = message.room;
  const msgServerId = message._id;
  const addMyMessage = !senderId && !msgServerId;
  const updateMyMessage = senderId === myId;
  const addOtherMessage = senderId !== myId;

  //? if the sender isn't available and message._id isn't available
  //? then it's my message and it is coming from chatController not from the server
  //? else if the sender is available and it is me
  //? then i will update the current message that have uuid with the message coming from the server
  //? if the sender isn't me then i will just add it to the displayed messages

  if (currentOpenRoomId === messageRoomId) {
    dispatch({
      type: c.UPDATE_DISPLAYED_MESSAGES,
      payload: { message, addMyMessage, updateMyMessage, addOtherMessage },
    });
  }
};
