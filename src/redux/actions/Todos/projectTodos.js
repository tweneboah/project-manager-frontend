import axios from "axios";

import { API_URL } from "../../../config/URLs";

import {
  CREATE_PROJECT_TODOS,
  FETCH_PROJECT_TODOS
} from "../actionTypes/actionTypes";

export const createProjectTodo = (projectTodoData, jwt) => {
  return async (dispatch) => {
    try {
      const projectTodoResponse = await axios({
        method: "POST",
        url: `${API_URL}/project-todos`,
        data: projectTodoData,
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
      dispatch({
        type: CREATE_PROJECT_TODOS,
        payload: projectTodoResponse.data
      });
    } catch (error) {}
  };
};

export const fetchProjectTodos = (jwt) => {
  return async (dispatch) => {
    try {
      const projectTodosResponse = await axios({
        method: "GET",
        url: `${API_URL}/project-todos`,
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });

      dispatch({
        type: FETCH_PROJECT_TODOS,
        payload: projectTodosResponse.data
      });
    } catch (error) {
      console.log(error);
    }
  };
};
