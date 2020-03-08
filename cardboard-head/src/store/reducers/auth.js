import * as actionTypes from "../actions/actionTypes";

const initialState = {
  userId: null,
  token: null,
  displayName: null,
  showLogin: false,
  showSignup: false,
  loggingIn: false,
  signingUp: false,
  inputEmail: "",
  inputPassword: "",
  inputPassword2: "",
  inputDisplayName: "",
  errorMsg: ""
};

const showLoginModal = (state, action) => {

  return {
    ...state,
    showLogin: true
  };
};

const showSignupModal = (state, action) => {

  return {
    ...state,
    showSignup: true
  };
};

const loginStart = (state, action) => {

  return {
    ...state,
    loggingIn: true,
    errorMsg: ""
  };
};

const signupStart = (state, action) => {

  return {
    ...state,
    signingUp: true,
    errorMsg: ""
  };
};

const initLoggedIn = (state, action) => {

  return {
    ...state,
    userId: action.userId,
    token: action.token,
    displayName: action.displayName
  };
};

const loginSuccess = (state, action) => {

  return {
    ...state,
    showLogin: false,
    loggingIn: false,
    inputEmail: "",
    inputPassword: "",
    errorMsg: "",
    userId: action.userId,
    token: action.token,
    displayName: action.displayName
  };
};

const loginFail = (state, action) => {

  return {
    ...state,
    loggingIn: false,
    errorMsg: action.error
  };
};

const loginClose = (state, action) => {

  return {
    ...state,
    showLogin: false,
    loggingIn: false,
    inputEmail: "",
    inputPassword: "",
    errorMsg: ""
  };
};

const signupSuccess = (state, action) => {

  return {
    ...state,
    showSignup: false,
    signingUp: false,
    inputEmail: "",
    inputPassword: "",
    inputPassword2: "",
    inputDisplayName: "",
    errorMsg: "",
    userId: action.userId,
    token: action.token,
    displayName: action.displayName
  };
};

const signupFail = (state, action) => {

  return {
    ...state,
    signingUp: false,
    errorMsg: action.error
  };
};

const signupClose = (state, action) => {

  return {
    ...state,
    showSignup: false,
    signingUp: false,
    inputEmail: "",
    inputPassword: "",
    inputPassword2: "",
    inputDisplayName: "",
    errorMsg: ""
  };
};

const logout = (state, action) => {

  return {
    ...state,
    userId: null,
    token: null,
    displayName: null
  };
};

const inputEmailChanged = (state, action) => {

  return {
    ...state,
    inputEmail: action.inputEmail
  };
};

const inputPasswordChanged = (state, action) => {

  return {
    ...state,
    inputPassword: action.inputPassword
  };
};

const inputPassword2Changed = (state, action) => {

  return {
    ...state,
    inputPassword2: action.inputPassword2
  };
};

const inputDisplayNameChanged = (state, action) => {

  return {
    ...state,
    inputDisplayName: action.inputDisplayName
  };
};

const clearLoginErrorMsg = (state, action) => {

  return {
    ...state,
    errorMsg: ""
  };
};

const setLoginErrorMsg = (state, action) => {

  return {
    ...state,
    errorMsg: action.message
  };
};

const reducer = (state = initialState, action) => {

  switch (action.type) {

    case actionTypes.SHOW_LOGIN_MODAL: return showLoginModal(state, action);
    case actionTypes.SHOW_SIGNUP_MODAL: return showSignupModal(state, action);
    case actionTypes.INIT_LOGGED_IN: return initLoggedIn(state, action);
    case actionTypes.LOGIN_START: return loginStart(state, action);
    case actionTypes.SIGNUP_START: return signupStart(state, action);
    case actionTypes.LOGIN_SUCCESS: return loginSuccess(state, action);
    case actionTypes.LOGIN_FAIL: return loginFail(state, action);
    case actionTypes.LOGIN_CLOSE: return loginClose(state, action);
    case actionTypes.SIGNUP_SUCCESS: return signupSuccess(state, action);
    case actionTypes.SIGNUP_FAIL: return signupFail(state, action);
    case actionTypes.SIGNUP_CLOSE: return signupClose(state, action);
    case actionTypes.LOGOUT: return logout(state, action);
    case actionTypes.INPUT_EMAIL_CHANGED: return inputEmailChanged(state, action);
    case actionTypes.INPUT_PASSWORD_CHANGED: return inputPasswordChanged(state, action);
    case actionTypes.INPUT_PASSWORD_2_CHANGED: return inputPassword2Changed(state, action);
    case actionTypes.INPUT_DISPLAY_NAME_CHANGED: return inputDisplayNameChanged(state, action);
    case actionTypes.CLEAR_LOGIN_ERROR_MSG: return clearLoginErrorMsg(state, action);
    case actionTypes.SET_LOGIN_ERROR_MSG: return setLoginErrorMsg(state, action);
    default: return state;
  }
};

export default reducer;
