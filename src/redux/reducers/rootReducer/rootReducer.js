import { combineReducers } from "redux";
import { reducer as toastrReducer } from "react-redux-toastr";
import projectsReducer from "../projects/projectsReducer";
import usersReducer from "../users/usersReducer";

const rootReducer = combineReducers({
  projects: projectsReducer,
  userAuth: usersReducer,
  toastr: toastrReducer
});

export default rootReducer;
