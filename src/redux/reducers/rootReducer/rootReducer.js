import { combineReducers } from "redux";
import projectsReducer from "../projects/projectsReducer";
import usersReducer from "../users/usersReducer";

const rootReducer = combineReducers({
  projects: projectsReducer,
  userAuth: usersReducer
});

export default rootReducer;
