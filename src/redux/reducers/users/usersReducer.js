import {
  REGISTER_USER,
  REGISTER_USER_ERROR,
  LOGIN_USER_ERROR,
  LOGIN_USER,
  SET_CURRENT_USER,
  USER_LOGOUT
} from "../../actions/actionTypes/actionTypes";

const INITIAL_STATE = {
  currentUser: null,
  authError: null
};
const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REGISTER_USER:
    case SET_CURRENT_USER:
    case LOGIN_USER:
      return {
        ...state,
        currentUser: action.payload
      };
    case REGISTER_USER_ERROR:
      return {
        ...state,
        authError: action.payload
      };
    case LOGIN_USER_ERROR:
      return {
        ...state,
        authError: action.payload
      };
    case USER_LOGOUT:
      return {
        currentUser: null,
        authError: null
      };
    default:
      return state;
  }
};

export default usersReducer;
