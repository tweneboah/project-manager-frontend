import axios from "axios";
import { API_URL } from "../../../config/URLs";
import {
  FETCH_EXPENSES_COMMENTS,
  CREATE_EXPENSES_COMMENT
} from "../actionTypes/actionTypes";

export const fetchExpensesComment = (expenseId, jwt) => {
  return async (dispatch) => {
    const expensRes = await axios({
      method: "GET",
      url: `${API_URL}/comments?expense=${expenseId}`,
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });
    dispatch({
      type: FETCH_EXPENSES_COMMENTS,
      payload: expensRes.data
    });
  };
};

export const createExpensesComment = (data, jwt) => {
  return async (dispatch) => {
    const expensRes = await axios({
      method: "POST",
      url: `${API_URL}/comments`,
      data: data,
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });
    dispatch({
      type: CREATE_EXPENSES_COMMENT,
      payload: expensRes.data
    });
  };
};
