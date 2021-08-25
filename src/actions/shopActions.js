import axios from "axios";
import { BASE_URL } from "../constants/Globals";
import {
  SHOP_FAIL,
  SHOP_REQUEST,
  SHOP_SUCCESS,
} from "../constants/shopConstants";

export const getShops = () => async (dispatch) => {
  try {
    dispatch({ type: SHOP_REQUEST });
    const { data } = await axios.get(`${BASE_URL}api/v2/public/shop`);

    dispatch({
      type: SHOP_SUCCESS,
      payload: data,
    });
   
  } catch (error) {
    dispatch({
      type: SHOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
