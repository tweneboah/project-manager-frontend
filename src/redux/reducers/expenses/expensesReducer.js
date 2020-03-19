import { FETCH_EXPENSES } from "../../actions/actionTypes/actionTypes";

const expensesReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_EXPENSES:
      return [...action.payload];

    default:
      return state;
  }
};

export default expensesReducer;
