import axios from "axios";

import { API_URL } from "../../../config/URLs";

import {
  FETCH_ALL_PROJECTS_ERRORS,
  FETCH_SINGLE_PROJECT,
  CREATE_PROJECT,
  FETCH_PROJECT_BY_USER_CODE,
  FETCH_ALL_PROJECTS_BY_USER
} from "../actionTypes/actionTypes";

export const fetchAllProjectsByUser = (jwt, userId) => {
  return async (dispatch) => {
    try {
      const projectsResponse = await axios({
        method: "GET",
        url: `${API_URL}/projects?user=${userId}`,

        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });

      dispatch({
        type: FETCH_ALL_PROJECTS_BY_USER,
        payload: projectsResponse.data
      });
    } catch (error) {
      dispatch({
        type: FETCH_ALL_PROJECTS_ERRORS,
        payload: "Fetch Error"
      });
    }
  };
};

export const fetchProjectByUserCode = (userCode) => {
  return async (dispatch) => {
    try {
      const projectsResponse = await axios({
        method: "GET",
        url: `${API_URL}/projects/?user.code=${userCode}`
      });

      dispatch({
        type: FETCH_PROJECT_BY_USER_CODE,
        payload: projectsResponse.data
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const fetchSingleProject = (projectId, token) => {
  return async (dispatch) => {
    try {
      const projectsResponse = await axios({
        method: "GET",
        url: `${API_URL}/projects/${projectId}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch({
        type: FETCH_SINGLE_PROJECT,
        payload: projectsResponse.data
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const createProject = (data, jwt) => {
  return async (dispatch) => {
    await axios({
      method: "POST",
      url: `${API_URL}/projects`,
      data: data,
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });
    dispatch({
      type: CREATE_PROJECT
    });
  };
};
