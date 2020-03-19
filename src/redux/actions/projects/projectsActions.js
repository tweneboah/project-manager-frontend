import axios from "axios";
import { API_URL } from "../../../config/URLs";
import {
  FETCH_ALL_PROJECTS,
  FETCH_ALL_PROJECTS_ERRORS,
  FETCH_SINGLE_PROJECT,
  CREATE_PROJECT
} from "../actionTypes/actionTypes";

export const fetchAllProjects = () => {
  return async (dispatch) => {
    try {
      // const projectsResponse = await axios({
      //   method: "GET",
      //   url: "https:teklinco-project-manager.herokuapp.com/projects"
      // });

      const projectsResponse = await axios.get(process.env.API_URL);
      console.log(projectsResponse.data);
      dispatch({
        type: FETCH_ALL_PROJECTS,
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

export const fetchSingleProject = (projectId) => {
  return async (dispatch) => {
    try {
      const projectsResponse = await axios({
        method: "GET",
        url: `${API_URL}/projects/${projectId}`
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

export const createProject = (data) => {
  return async (dispatch) => {
    await axios({
      method: "POST",
      url: `${API_URL}/projects`,
      data
    });
    dispatch({
      type: CREATE_PROJECT
    });
  };
};
