import {
  FETCH_EXPENSES_COMMENTS,
  CREATE_EXPENSES_COMMENT
} from "../../actions/actionTypes/actionTypes";

const expensesReducer = (state = [], action) => {
  switch (action.type) {
    case CREATE_EXPENSES_COMMENT:
    case FETCH_EXPENSES_COMMENTS:
      return [...action.payload];

    default:
      return state;
  }
};

export default expensesReducer;
