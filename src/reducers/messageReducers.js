import * as c from '../constants/messagesConstants';

//! improvement => when user visit room and its content added to hist redux
//! try not remove it when opening another room
//! for better performance

export const getRoomMessagesReducer = (state = { messages: [] }, action) => {
  switch (action.type) {
    case c.GET_ROOM_MESSAGES_REQUEST:
      return { loading: true };
    case c.GET_ROOM_MESSAGES_SUCCESS:
      return { loading: false, messages: action.payload };
    case c.GET_ROOM_MESSAGES_FAIL:
      return { loading: false, err: action.payload };
    case c.UPDATE_DISPLAYED_MESSAGES:
      try {
        const {
          message,
          addMyMessage,
          updateMyMessage,
          addOtherMessage,
        } = action.payload;
        let messages = [...state.messages];

        if (addMyMessage) {
          messages.push(message);
        } else if (updateMyMessage) {
          const newModifiedMessages = updateAnArray(messages, message);
          messages = newModifiedMessages;
        } else if (addOtherMessage) {
          messages.push(message);
        } else {
          alert('Non expected state coming from message reducer check console');
        }
        return { ...state, messages };
      } catch (err) {
        return state;
      }

    case c.GET_ROOM_MESSAGES_RESET:
      return {};
    default:
      return state;
  }
};

export const createMessageReducer = (state = {}, action) => {
  switch (action.type) {
    case c.CREATE_MESSAGE_REQUEST:
      return { loading: true };
    case c.CREATE_MESSAGE_SUCCESS:
      return { loading: false, message: action.payload, success: true };
    case c.CREATE_MESSAGE_FAIL:
      return { loading: false, err: action.payload };
    case c.CREATE_MESSAGE_RESET:
      return {};
    default:
      return state;
  }
};

const updateAnArray = (array = [], newObj = {}, identifier = 'clientId') => {
  const oldObj = array.find((item) => item[identifier] === newObj[identifier]);

  const oldObjIndex = array.indexOf(oldObj);
  // const firstPartArray = array.splice(0, oldObjIndex);
  // const lastPartArray = array.splice(oldObjIndex + 1);
  // const finalResultArray = [...firstPartArray, newObj, ...lastPartArray];
  array.splice(oldObjIndex, 1, newObj);

  return array;
};
