import * as c from '../constants/userConstants';

export const loginUserReducer = (state = {}, action) => {
  switch (action.type) {
    case c.LOGIN_REQUEST:
      return { loading: true };
    case c.LOGIN_SUCCESS:
      return { loading: false, user: action.payload, success: true };
    case c.LOGIN_FAIL:
      return { loading: false, err: action.payload };
    case c.SIGNUP_REQUEST:
      return { loading: true };
    case c.SIGNUP_SUCCESS:
      return { loading: false, user: action.payload, success: true };
    case c.SIGNUP_FAIL:
      return { loading: false, err: action.payload };
    case c.LOGOUT_USER:
      return {};
    case c.UPDATE_USER_SUCCESS:
      return { ...state, user: { ...state.user, ...action.payload } };
    case c.VERIFY_USER_SUCCESS:
      return { loading: false, user: action.payload, success: true };
    default:
      return state;
  }
};

export const updateMeReducer = (state = {}, action) => {
  switch (action.type) {
    case c.UPDATE_USER_REQUEST:
      return { loading: true };
    case c.UPDATE_USER_SUCCESS:
      return { loading: false, success: true };
    case c.UPDATE_USER_FAIL:
      return { loading: false, err: action.payload };
    case c.UPDATE_USER_RESET:
      return {};
    default:
      return state;
  }
};

export const setCurrentChattingUserDataReducer = (state = {}, action) => {
  switch (action.type) {
    case c.CURRENT_USER_DATA:
      return { ...state, ...action.payload };
    case c.CURRENT_USER_DATA_RESET:
      return {};
    default:
      return state;
  }
};

export const userForgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case c.FORGOT_PASSWORD_REQUEST:
      return { loading: true };
    case c.FORGOT_PASSWORD_SUCCESS:
      return { loading: false, success: true };
    case c.FORGOT_PASSWORD_FAIL:
      return { loading: false, err: action.payload };
    default:
      return state;
  }
};
export const userResetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case c.RESET_PASSWORD_REQUEST:
      return { loading: true };
    case c.RESET_PASSWORD_SUCCESS:
      return { loading: false, success: true };
    case c.RESET_PASSWORD_FAIL:
      return { loading: false, err: action.payload };
    default:
      return state;
  }
};

export const userVerifyEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case c.VERIFY_USER_REQUEST:
      return { loading: true };
    case c.VERIFY_USER_FAIL:
      return { loading: false, err: action.payload };
    case c.VERIFY_USER_RESET:
      return {};
    default:
      return state;
  }
};
