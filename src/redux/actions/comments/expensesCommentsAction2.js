import axios from "axios";
import { API_URL } from "../../../config/URLs";
import { FETCH_EXPENSES_COMMENTS_BY_EXPENSES } from "../actionTypes/actionTypes";

export const expensesCommentsAction = (jwt, expenseId) => {
  return async (dispatch) => {
    const expensRes = await axios({
      method: "GET",
      url: `${API_URL}/comments?expense=${expenseId}`,
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });
    dispatch({
      type: FETCH_EXPENSES_COMMENTS_BY_EXPENSES,
      payload: expensRes.data
    });
  };
};
