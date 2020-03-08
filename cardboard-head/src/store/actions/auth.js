import axios from "axios";

import * as actionTypes from "./actionTypes";
import * as msg from "../messages";
import { checkValidEmail, checkValidPassword } from "../../resources/utils";
import * as c from "../../resources/constants";
import CODE_MAP from "../../resources/codeMap";

export const showLogin = () => {
  return { type: actionTypes.SHOW_LOGIN_MODAL };
};

export const loginClose = () => {
  return { type: actionTypes.LOGIN_CLOSE };
};

export const showSignup = () => {
  return { type: actionTypes.SHOW_SIGNUP_MODAL };
};

export const signupClose = () => {
  return { type: actionTypes.SIGNUP_CLOSE };
};

export const initLoggedIn = () => {

  return {
    type: actionTypes.INIT_LOGGED_IN,
    userId: localStorage.getItem("sellswordUserId"),
    token: localStorage.getItem("sellswordToken"),
    displayName: localStorage.getItem("sellswordDisplayName")
  };
};

export const loginStart = () => {
  return { type: actionTypes.LOGIN_START };
};

export const signupStart = () => {
  return { type: actionTypes.SIGNUP_START };
};

export const loginSuccess = (userId, token, displayName) => {

  return {
    type: actionTypes.LOGIN_SUCCESS,
    userId: userId,
    token: token,
    displayName: displayName
  };
};

export const loginFail = (error) => {

  return {
    type: actionTypes.LOGIN_FAIL,
    error: error
  };
};

export const signupSuccess = (userId, token, displayName) => {

  return {
    type: actionTypes.SIGNUP_SUCCESS,
    userId: userId,
    token: token,
    displayName: displayName
  };
};

export const signupFail = (error) => {

  return {
    type: actionTypes.SIGNUP_FAIL,
    error: error
  };
};

export const logout = () => {

  localStorage.removeItem("sellswordToken");
  localStorage.removeItem("sellswordExpiration");
  localStorage.removeItem("sellswordUserId");
  localStorage.removeItem("sellswordDisplayName");

  return {
    type: actionTypes.LOGOUT
  };
};

export const inputEmailChanged = (inputEmail) => {

  return {
    type: actionTypes.INPUT_EMAIL_CHANGED,
    inputEmail: inputEmail
  };
};

export const inputPasswordChanged = (inputPw) => {

  return {
    type: actionTypes.INPUT_PASSWORD_CHANGED,
    inputPassword: inputPw
  };
};

export const inputPassword2Changed = (inputPw2) => {

  return {
    type: actionTypes.INPUT_PASSWORD_2_CHANGED,
    inputPassword2: inputPw2
  };
};

export const inputDisplayNameChanged = (inputDisplayName) => {

  return {
    type: actionTypes.INPUT_DISPLAY_NAME_CHANGED,
    inputDisplayName: inputDisplayName
  };
};

export const clearLoginErrorMsg = () => {
  return { type: actionTypes.CLEAR_LOGIN_ERROR_MSG };
};

export const setLoginErrorMsg = (msg) => {

  return {
    type: actionTypes.SET_LOGIN_ERROR_MSG,
    message: msg
  };
};

export const processLogin = (loggingIn, signingUp, email, password, emailRef,
   passwordRef) => {

  if (loggingIn || signingUp) { return; }

  return async (dispatch) => {

    email = email.trim();

    dispatch(clearLoginErrorMsg());

    if (email === "") {

      dispatch(setLoginErrorMsg(msg.BLANK_EMAIL));

      emailRef.current.focus();
      return;
    }

    if (password === "") {

      dispatch(setLoginErrorMsg(msg.BLANK_PASSWORD));

      passwordRef.current.focus();
      return;
    }

    if (!checkValidEmail(email)) {

      dispatch(setLoginErrorMsg(msg.INVALID_EMAIL));

      emailRef.current.focus();
      return;
    }

    const params = {
      email: email,
      password: password
    };

    dispatch(loginStart());

    try {

      let res = await axios.post(c.BASE_URL + "/login", params);
      const body = res.data.body;

      if (body.authCode !== 900) {
        dispatch(loginFail(CODE_MAP[body.authCode]));
      } else if (body.authCode === 900) {

        localStorage.setItem("sellswordToken", body.verificationToken);
        localStorage.setItem("sellswordExpiration", body.expiresAt);
        localStorage.setItem("sellswordUserId", body.userId);
        localStorage.setItem("sellswordDisplayName", body.displayName);

        dispatch(loginSuccess(body.userId, body.verificationToken, body.displayName));

      } else {
        throw new Error("Login failed");
      }
    }
    catch (err) {

      dispatch(loginFail(err.message));
      console.log(err.message);
    }
  };
};

export const processSignup = (loggingIn, signingUp, email, password,
  password2, displayName, emailRef, passwordRef, password2Ref,
  displayNameRef) => {

  if (loggingIn || signingUp) { return; }

  return async (dispatch) => {

    email = email.trim();
    displayName = displayName.trim();

    dispatch(clearLoginErrorMsg());

    if (email === "") {

      dispatch(setLoginErrorMsg(msg.BLANK_EMAIL));

      emailRef.current.focus();
      return;
    }

    if (password === "") {

      dispatch(setLoginErrorMsg(msg.BLANK_PASSWORD));

      passwordRef.current.focus();
      return;
    }

    if (password2 === "") {

      dispatch(setLoginErrorMsg(msg.BLANK_PASSWORD_2));

      password2Ref.current.focus();
      return;
    }

    if (displayName === "") {

      dispatch(setLoginErrorMsg(msg.BLANK_DISPLAY_NAME));

      displayNameRef.current.focus();
      return;
    }

    if (!checkValidEmail(email)) {

      dispatch(setLoginErrorMsg(msg.INVALID_EMAIL));

      emailRef.current.focus();
      return;
    }

    if (!checkValidPassword(password)) {

      dispatch(setLoginErrorMsg(msg.INVALID_PASSWORD));

      passwordRef.current.focus();
      return;
    }

    if (password !== password2) {

      dispatch(setLoginErrorMsg(msg.PASSWORDS_DO_NOT_MATCH));

      password2Ref.current.focus();
      return;
    }

    const params = {
      email: email,
      password: password,
      displayName: displayName
    };

    dispatch(signupStart());

    try {

      let res = await axios.post(c.BASE_URL + "/signup", params);
      const body = res.data.body;

      if (body.authCode !== 910) {

        dispatch(signupFail(CODE_MAP[body.authCode]));

        if (body.authCode === 911) {
          emailRef.current.focus();
        }

      } else if (body.authCode === 910) {

        localStorage.setItem("sellswordToken", body.verificationToken);
        localStorage.setItem("sellswordExpiration", body.expiresAt);
        localStorage.setItem("sellswordUserId", body.userId);
        localStorage.setItem("sellswordDisplayName", body.displayName);

        dispatch(signupSuccess(body.userId, body.verificationToken, body.displayName));

      } else {
        throw new Error("Signup failed");
      }
    }
    catch (err) {

      dispatch(signupFail(err.message));
      console.log(err.message);
    }
  };
};
