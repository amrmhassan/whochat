import * as c from '../constants/userConstants';
import {
  CURRENT_OPEN_ROOM_RESET,
  GET_MY_ROOMS_RESET,
} from '../constants/roomConstants';
import * as urls from '../constants/urls';
import { GET_ROOM_MESSAGES_RESET } from '../constants/messagesConstants';
import axios from 'axios';

export const loginUserAction = (userData) => async (dispatch, getState) => {
  try {
    // const isToken = typeof userData === 'string';
    dispatch({
      type: c.LOGIN_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      `${urls.usersUrl}/login`,
      userData,
      config
    );

    const { token, user } = data;
    const payload = { ...user, token };

    dispatch({
      type: c.LOGIN_SUCCESS,
      payload,
    });

    localStorage.setItem('loggedInUser', JSON.stringify(payload));
  } catch (err) {
    dispatch({
      type: c.LOGIN_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const logoutUser = () => (dispatch, getState) => {
  dispatch({
    type: c.LOGOUT_USER,
  });
  dispatch({
    type: CURRENT_OPEN_ROOM_RESET,
  });
  dispatch({
    type: c.CURRENT_USER_DATA_RESET,
  });
  dispatch({
    type: GET_MY_ROOMS_RESET,
  });
  dispatch({
    type: GET_ROOM_MESSAGES_RESET,
  });

  localStorage.removeItem('loggedInUser');
  localStorage.removeItem('currentRoom');
  localStorage.removeItem('currentChattingUserData');
  localStorage.removeItem('currentOpenRoomId');
  const socket = getState().socket;
  socket.disconnect();
};

export const signupUserAction = (userData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: c.SIGNUP_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const {
      data: { data },
    } = await axios.post(`${urls.usersUrl}/signup`, userData, config);

    const user = data;
    const payload = { ...user };

    dispatch({
      type: c.SIGNUP_SUCCESS,
      payload,
    });

    localStorage.setItem('loggedInUser', JSON.stringify(payload));
  } catch (err) {
    dispatch({
      type: c.SIGNUP_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const userForgotPasswordAction = (email) => async (
  dispatch,
  getState
) => {
  try {
    // const isToken = typeof userData === 'string';
    dispatch({
      type: c.FORGOT_PASSWORD_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await axios.post(`${urls.usersUrl}/forgotPassword`, { email }, config);

    dispatch({
      type: c.FORGOT_PASSWORD_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: c.FORGOT_PASSWORD_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const userResetPasswordAction = (token, userData) => async (
  dispatch,
  getState
) => {
  try {
    // const isToken = typeof userData === 'string';
    dispatch({
      type: c.RESET_PASSWORD_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await axios.post(
      `${urls.usersUrl}/resetPassword/${token}`,
      userData,
      config
    );

    dispatch({
      type: c.RESET_PASSWORD_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: c.RESET_PASSWORD_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

// export const updateUserStatus = (userObj) => async (dispatch, getState) => {
//   let currentOpenRoom = getState().currentOpenRoom.currentOpenRoom || {};
//   if (
//     !currentOpenRoom.userToShowOnRoom ||
//     userObj.userId !== currentOpenRoom.userToShowOnRoom._id
//   ) {
//     return;
//   }

//   let userToShowOnRoom = currentOpenRoom.userToShowOnRoom;

//   let onlineId = '';
//   let lastSeenAt = '';

//   if (userObj.onlineId) {
//     onlineId = userObj.onlineId;
//   } else if (userObj.lastSeenAt) {
//     lastSeenAt = userObj.lastSeenAt;
//   }

//   userToShowOnRoom = {
//     ...userToShowOnRoom,
//     onlineId,
//     lastSeenAt,
//   };
//   currentOpenRoom = { ...currentOpenRoom, userToShowOnRoom };
//   dispatch({
//     type: UPDATE_CURRENT_OPEN_ROOM,
//     payload: currentOpenRoom,
//   });
// };

// export const setUserTyping = (userObj) => (dispatch, getState) => {
//   let currentOpenRoom = getState().currentOpenRoom.currentOpenRoom || {};
//   if (
//     !currentOpenRoom.userToShowOnRoom ||
//     userObj.userId !== currentOpenRoom.userToShowOnRoom._id
//   ) {
//     return;
//   }

//   let typing = '';
//   if (userObj.typing) {
//     typing = 'typing';
//   } else {
//     typing = '';
//   }

//   dispatch({
//     type: TYPING_MESSAGE,
//     payload: typing,
//   });
// };

export const setCurrentChattingUserData = (
  userObj,
  options = { type: 'update', force: false }
) => async (dispatch, getState) => {
  //? options object will have a steady prop called (type:'new' or 'update')=> default is update
  //!
  //? if type is update then we will check if the user id matches with the current chatting user
  if (options.type === 'update') {
    let currentOpenRoom = getState().currentOpenRoom.currentOpenRoom || {};
    if (
      !currentOpenRoom.userToShowOnRoom ||
      userObj.userId !== currentOpenRoom.userToShowOnRoom._id
    ) {
      return;
    }

    //? userObj will have fullName firstName lastName email about

    //? status      | => the userObj content
    //? ------------|-----------------------------------------------
    //? online      | => userId, onlineId
    //? offline     | => userId, lastSeenAt
    //? startTyping | => userId, typing:true , typingUserOnlineId
    //? stopTyping  | => userId, typing:false, typingUserOnlineId

    dispatch({
      type: c.CURRENT_USER_DATA,
      payload: userObj,
    });

    const currentUserDate = getState().currentChattingUserData;
    const userObjToSaveInLocalStorage = { ...currentUserDate, ...userObj };
    localStorage.setItem(
      'currentChattingUserData',
      JSON.stringify(userObjToSaveInLocalStorage)
    );
  } else if (options.type === 'new') {
    try {
      let currentOpenRoom = getState().currentOpenRoom.currentOpenRoom || {
        userToShowOnRoom: {},
      };
      //? checking if that request is made when we reload the current chatting user data
      //? from server when it is saved to local storage but we need to update it

      if (
        currentOpenRoom.userToShowOnRoom._id === userObj.userId &&
        !options.force
      ) {
        return;
      }
      //? here checking if the userId exists
      if (!userObj.userId) {
        return;
      }

      const token = `Bearer ${getState().loginUser.user.token}`;
      const config = {
        headers: {
          authorization: token,
        },
      };

      const {
        data: { data },
      } = await axios.get(
        `${urls.usersUrl}/getUserData/${userObj.userId}`,
        config
      );

      const status = data.onlineId ? 'online' : 'offline';
      const userData = { status, ...data };
      dispatch({
        type: c.CURRENT_USER_DATA_RESET,
      });
      dispatch({
        type: c.CURRENT_USER_DATA,
        payload: userData,
      });

      localStorage.setItem('currentChattingUserData', JSON.stringify(userData));
    } catch (err) {
      dispatch({
        type: c.CURRENT_USER_DATA_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  }
};

export const updateMeAction = (userData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: c.UPDATE_USER_REQUEST,
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
    } = await axios.patch(`${urls.usersUrl}/updateMe`, userData, config);

    dispatch({
      type: c.UPDATE_USER_SUCCESS,
      payload: data,
    });

    const dataToSaveInLocalStorage = getState().loginUser.user;

    localStorage.setItem(
      'loggedInUser',
      JSON.stringify(dataToSaveInLocalStorage)
    );
  } catch (err) {
    dispatch({
      type: c.UPDATE_USER_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
export const userVerifyEmailAction = (verifyToken, userEmail) => async (
  dispatch
) => {
  try {
    dispatch({
      type: c.VERIFY_USER_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      `${urls.usersUrl}/verifyEmail/${verifyToken}`,
      { email: userEmail },
      config
    );

    const { token, user } = data;
    const payload = { ...user, token };

    dispatch({
      type: c.VERIFY_USER_SUCCESS,
      payload,
    });

    localStorage.setItem('loggedInUser', JSON.stringify(payload));
  } catch (err) {
    dispatch({
      type: c.VERIFY_USER_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const searchUsersAction = (searchQuery) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: c.SEARCH_USERS_REQUEST,
    });
    const token = `Bearer ${getState().loginUser.user.token}`;
    const config = {
      headers: {
        authorization: token,
      },
    };

    const {
      data: { data },
    } = await axios.get(`${urls.usersUrl}/searchUsers/${searchQuery}`, config);
    dispatch({
      type: c.SEARCH_USERS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: c.SEARCH_USERS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
