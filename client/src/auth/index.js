import React, { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "./auth-request-api";

import { useContext } from "react";
import GlobalStoreContext from "../store";

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
  GET_LOGGED_IN: "GET_LOGGED_IN",
  LOGIN_USER: "LOGIN_USER",
  LOGOUT_USER: "LOGOUT_USER",
  REGISTER_USER: "REGISTER_USER",
  CONTINUE_AS_GUEST: "CONTINUE_AS_GUEST",
};

function AuthContextProvider(props) {
  const [auth, setAuth] = useState({
    user: null,
    loggedIn: false,
    guest: false,
  });
  const history = useHistory();

  useEffect(() => {
    auth.getLoggedIn();
  }, []);

  const authReducer = (action) => {
    const { type, payload } = action;
    switch (type) {
      case AuthActionType.GET_LOGGED_IN: {
        return setAuth({
          user: payload.user,
          loggedIn: payload.loggedIn,
          guest: false,
        });
      }
      case AuthActionType.LOGIN_USER: {
        return setAuth({
          user: payload.user,
          loggedIn: true,
          guest: false,
        });
      }
      case AuthActionType.LOGOUT_USER: {
        return setAuth({
          user: null,
          loggedIn: false,
          guest: false,
        });
      }
      case AuthActionType.REGISTER_USER: {
        return setAuth({
          user: payload.user,
          loggedIn: true,
          guest: false,
        });
      }
      case AuthActionType.CONTINUE_AS_GUEST: {
        return setAuth({
          user: null,
          loggedIn: false,
          guest: true,
        });
      }

      default:
        return auth;
    }
  };

  auth.continueAsGuest = async function () {
    authReducer({
      type: AuthActionType.CONTINUE_AS_GUEST,
    });
  };

  auth.getLoggedIn = async function () {
    const response = await api.getLoggedIn();
    if (response.status === 200) {
      authReducer({
        type: AuthActionType.SET_LOGGED_IN,
        payload: {
          loggedIn: response.data.loggedIn,
          user: response.data.user,
        },
      });
    }
  };

  auth.registerUser = async function (
    userName,
    firstName,
    lastName,
    email,
    password,
    passwordVerify
  ) {
    var res = "success";
    const response = await api
      .registerUser(
        userName,
        firstName,
        lastName,
        email,
        password,
        passwordVerify
      )
      .catch((error) => {
        res = error.response.data.errorMessage;
      });
    if (res !== "success") {
      return res;
    }
    if (response.status === 200) {
      authReducer({
        type: AuthActionType.REGISTER_USER,
        payload: {
          user: response.data.user,
        },
      });
      history.push("/login");
      return res;
    }
  };

  auth.loginUser = async function (email, password) {
    var res = "success";
    const response = await api.loginUser(email, password).catch((error) => {
      res = error.response.data.errorMessage;
    });

    if (res !== "success") {
      return res;
    }

    if (response.status === 200) {
      authReducer({
        type: AuthActionType.LOGIN_USER,
        payload: {
          user: response.data.user,
        },
      });
      history.push("/");
      return res;
    }
  };

  auth.logoutUser = async function () {
    const response = await api.logoutUser();
    if (response.status === 200) {
      authReducer({
        type: AuthActionType.LOGOUT_USER,
        payload: null,
      });
      history.push("/");
    }
  };

  auth.getUserInitials = function () {
    let initials = "";
    if (auth.user) {
      initials += auth.user.firstName.charAt(0);
      initials += auth.user.lastName.charAt(0);
    }
    console.log("user initials: " + initials);
    return initials;
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
