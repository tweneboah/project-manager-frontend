import axios from "axios";
import { API_URL } from "../../../config/URLs";
import { CREATE_INCOME } from "../actionTypes/actionTypes";

export const createIncome = (data, jwt) => {
  return async (dispatch) => {
    await axios({
      method: "POST",
      url: `${API_URL}/incomes`,
      data: data,
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });
    dispatch({
      type: CREATE_INCOME
    });
  };
};
