import axios from "axios";
import { API_URL } from "../../../config/URLs";
import { CREATE_EXPENSE } from "../actionTypes/actionTypes";

export const createExpenses = (data, jwt) => {
  return async (dispatch) => {
    try {
      const expenseResponse = await axios({
        method: "POST",
        url: `${API_URL}/expenses`,
        data: data,
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });

      if (expenseResponse) {
        //Grab the expense created Id to create it's image
        const expenseId = expenseResponse.data.id;
        const {
          id,
          amount,
          description,
          title,
          merchant_contact,
          merchant_name,
          createdAt,
          updatedAt,
          project,
          confirm
        } = expenseResponse.data;
        // Rember
        //Create profile picture
        const formData = new FormData();
        formData.append("files", data.receiptPicture[0]);

        //Required by strapi

        formData.append("ref", "expense"); //name of content type
        formData.append("refId", expenseId); //id of content type
        formData.append("field", "receipt"); //name of key for the content
        const res = await axios({
          method: "POST",
          url: `${API_URL}/upload`,
          data: formData
        });
        console.log("Receipt", res.data[0]);

        //Grap the created Image and attach it to the created expense and send it to the reducer
        const receiptPicture = res.data[0];

        //Build up the object
        const createdExpense = {
          receiptPicture,
          id,
          amount,
          description,
          title,
          merchant_contact,
          merchant_name,
          createdAt,
          updatedAt,
          project,
          confirm
        };
        dispatch({
          type: CREATE_EXPENSE,
          payload: createdExpense
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
