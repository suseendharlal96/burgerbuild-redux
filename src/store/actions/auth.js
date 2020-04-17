import axios from "axios";

import * as actionType from "./actionTypes";

export const loginSuccess = (data) => {
  return {
    type: actionType.AUTH_SUCCESS,
    idToken: data.idToken,
    localId: data.localId,
  };
};

export const loginFail = (error) => {
  return {
    type: actionType.AUTH_FAIL,
    error: error,
  };
};

export const authInit = () => {
  return {
    type: actionType.AUTH_START,
  };
};

export const logout = () => {
  return {
    type: actionType.AUTH_LOGOUT,
  };
};

export const authLogout = (token) => {
  console.log(token, typeof token);
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, +token.expiresIn * 1000);
  };
};

export const authStart = (isSignup, data) => {
  console.log(isSignup, data);
  const loginData = {
    email: data.email.value,
    password: data.password.value,
    returnSecureToken: true,
  };
  return (dispatch) => {
    dispatch(authInit());
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD_BdKBtzVoHhJ41kRbrG2zgfaKrzAc8-A";
    if (isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD_BdKBtzVoHhJ41kRbrG2zgfaKrzAc8-A";
    }
    console.log(url);
    axios
      .post(url, loginData)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        dispatch(loginSuccess(res.data));
        dispatch(authLogout(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(loginFail(err.response.data.error.message));
        // alert(err.message);
      });
  };
};
