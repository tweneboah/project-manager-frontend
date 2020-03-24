import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../../config/URLs";
import {
  REGISTER_USER,
  LOGIN_USER,
  REGISTER_USER_ERROR,
  LOGIN_USER_ERROR,
  SET_CURRENT_USER,
  USER_LOGOUT,
  GET_MY_PROFILE,
  EXPENSES_PROJECT_INCOME_CREATOR
} from "../actionTypes/actionTypes";

export const registerUser = (data) => {
  return async (dispact) => {
    try {
      const userResponse = await axios({
        method: "POST",
        url: `${API_URL}/auth/local/register`,
        data: data
      });

      //SAVE USER DETAILS INTO LOCALSTORAGE
      //Grab jwt
      const { jwt } = userResponse.data;
      const { _id } = userResponse.data.user;
      const userData = {
        jwt,
        _id
      };

      dispact({
        type: REGISTER_USER,
        payload: userData
      });
      // We have to return the user from here because we need the created user in our frontentend to create it's profile picture
      localStorage.setItem("user", JSON.stringify(userData));
      const userForm = userResponse.data;
      return userForm;
    } catch (error) {
      dispact({
        type: REGISTER_USER_ERROR,
        payload: "Email is taken/password is below 7 characters"
      });
      toast.error("Invalid credentials");
    }
  };
};

export const loginUser = (data) => {
  return async (dispact) => {
    try {
      const userResponse = await axios({
        method: "POST",
        url: `${API_URL}/auth/local`,
        data: data
      });
      //SAVE USER DETAILS INTO LOCALSTORAGE
      //Grab jwt
      const { jwt } = userResponse.data;
      const { _id } = userResponse.data.user;
      const userData = {
        jwt,
        _id
      };

      dispact({
        type: LOGIN_USER,
        payload: userData
      });
      localStorage.setItem("user", JSON.stringify(userData));

      toast.success("Successfully logged in");
    } catch (error) {
      console.log(error);
      dispact({
        type: LOGIN_USER_ERROR,
        payload: "Username/Password is invalid"
      });
    }
  };
};

export const setCurrentUser = () => {
  return async (dispatch) => {
    const userAuth = await JSON.parse(localStorage.getItem("user"));
    dispatch({
      type: SET_CURRENT_USER,
      payload: userAuth
    });
  };
};

export const logout = () => {
  return async (dispatch) => {
    localStorage.removeItem("user");
    dispatch({
      type: USER_LOGOUT
    });
  };
};

export const getMyProfile = (userId) => {
  return async (dispact) => {
    try {
      const userResponse = await axios({
        method: "GET",
        url: `${API_URL}/users/${userId}`
      });
      dispact({
        type: GET_MY_PROFILE,
        payload: userResponse.data
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const incomeExpensesProjectCreator = (userId) => {
  return async (dispact) => {
    try {
      const userResponse = await axios({
        method: "GET",
        url: `${API_URL}/users/${userId}`
      });
      dispact({
        type: EXPENSES_PROJECT_INCOME_CREATOR,
        payload: userResponse.data
      });
    } catch (error) {
      console.log(error);
    }
  };
};
