import {
  FETCH_ALL_PROJECTS,
  FETCH_ALL_PROJECTS_ERRORS,
  FETCH_SINGLE_PROJECT,
  CREATE_PROJECT,
  CREATE_INCOME,
  CREATE_EXPENSE,
  FETCH_PROJECT_BY_USER_CODE,
  CREATE_PROJECT_TODOS
} from "../../actions/actionTypes/actionTypes";

const INITIAL_STATE = {
  fetchErrors: {},
  projects: [],
  singleProject: null
};

const projectsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PROJECT_BY_USER_CODE:
    case CREATE_PROJECT_TODOS:
      return {
        ...state,
        projects: [...action.payload]
      };

    case FETCH_ALL_PROJECTS_ERRORS:
      return {
        ...state,
        fetchErrors: action.payload
      };
    case FETCH_SINGLE_PROJECT:
    case CREATE_PROJECT_TODOS:
      return {
        ...state,
        singleProject: action.payload
      };
    case CREATE_INCOME:
    case CREATE_PROJECT:
    case CREATE_EXPENSE:
      return state;
    default:
      return state;
  }
};

export default projectsReducer;
