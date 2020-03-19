import axios from "axios";
import { API_URL } from "../../../config/URLs";
import { CREATE_INCOME } from "../actionTypes/actionTypes";
export const createIncome = (data) => {
  return async (dispatch) => {
    await axios({
      method: "POST",
      url: `${API_URL}/incomes`,
      data
    });
    dispatch({
      type: CREATE_INCOME
    });
  };
};
