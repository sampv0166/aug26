import axios from "axios";
import {
  CATEGORY_FAIL,
  CATEGORY_REQUEST,
  CATEGORY_SUCCESS,
} from "../constants/categoryConstants";
import { BASE_URL } from "../constants/Globals";

export const getCategory = () => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_REQUEST });
    const { data } = await axios.get(`${BASE_URL}api/v2/public/category`);

    dispatch({
      type: CATEGORY_SUCCESS,
      payload: data,
    });
    
  } catch (error) {
    dispatch({
      type: CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
