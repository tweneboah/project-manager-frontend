import axios from "axios";
import { API_URL } from "../../../config/URLs";
import { CREATE_EXPENSE } from "../actionTypes/actionTypes";

export const createExpenses = (data, jwt) => {
  return async (dispatch) => {
    try {
      await axios({
        method: "POST",
        url: `${API_URL}/expenses`,
        data,
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
      dispatch({
        type: CREATE_EXPENSE
      });
    } catch (error) {
      console.log(error);
    }
  };
};
