import { combineReducers } from "redux";
import projectsReducer from "../projects/projectsReducer";
import expensesReducer from "../expenses/expensesReducer";

const rootReducer = combineReducers({
  projects: projectsReducer
  // expenses: expensesReducer
});

export default rootReducer;
