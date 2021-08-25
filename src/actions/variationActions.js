import axios from "axios";
import { BASE_URL } from "../constants/Globals";
import {
  VARIATION_CREATE_FAIL,
  VARIATION_CREATE_REQUEST,
  VARIATION_CREATE_SUCCESS,
  VARIATION_DELETE_FAIL,
  VARIATION_DELETE_REQUEST,
  VARIATION_DELETE_SUCCESS,
  VARIATION_IMAGE_DELETE_FAIL,
  VARIATION_IMAGE_DELETE_REQUEST,
  VARIATION_IMAGE_DELETE_SUCCESS,
  VARIATION_UPDATE_FAIL,
  VARIATION_UPDATE_REQUEST,
  VARIATION_UPDATE_SUCCESS,
} from "../constants/variationConstants";

export const createVariation =
  (dispatch, formdata, ProductVariationList, hasVariant, data) => async () => {
    try {
      let response;
      dispatch({
        type: VARIATION_CREATE_REQUEST,
      });

      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.success.token}`,
        },
      };

      ProductVariationList.map((variations, index) => {
        const arr = variations.images.map((file) => file);
        let variationformdata = new FormData();
        let images;
        variationformdata.set("product_id", data.id);
        variationformdata.set("price", variations.price);
        variationformdata.set("offerprice", variations.offerprice);
        variationformdata.set("stocks", variations.stocks);
        variationformdata.set("color_name", variations.color_name);
        variationformdata.set("color_value", variations.color_value);
        variationformdata.set("hasoffer", variations.hasoffer);
        variationformdata.set("size_value", variations.size_value);

        if (hasVariant) {
          for (var i = 0; i < arr.length; i++) {
            variationformdata.append(`images[${i}]`, arr[i]);
          }
        } else {
          variationformdata.append(`images[${i}]`, variations.image[0]);
        }
        for (var value of variationformdata.values()) {
          console.log(value);
        }

        const { vardata } = axios.post(
          `${BASE_URL}api/v2/admin/variation`,
          variationformdata,
          config
        );

        response = vardata;
      });

      dispatch({
        type: VARIATION_CREATE_SUCCESS,
        payload: response,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      /*if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }*/
      dispatch({
        type: VARIATION_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const createSingleVariation = (dispatch, formdata) => async () => {
  try {
    dispatch({
      type: VARIATION_UPDATE_REQUEST,
    });
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.success.token}`,
      },
    };
    const { data } = axios.post(
      `${BASE_URL}api/v2/admin/variation`,
      formdata,
      config
    );

    dispatch({
      type: VARIATION_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    /*if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }*/
    dispatch({
      type: VARIATION_UPDATE_FAIL,
      payload: message,
    });
  }
};



export const updateVariation = (dispatch, formdata) => async () => {
  try {
    dispatch({
      type: VARIATION_UPDATE_REQUEST,
    });
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.success.token}`,
      },
    };
    const { data } = axios.post(
      `${BASE_URL}api/v2/admin/variation`,
      formdata,
      config
    );

    dispatch({
      type: VARIATION_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    /*if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }*/
    dispatch({
      type: VARIATION_UPDATE_FAIL,
      payload: message,
    });
  }
};



export const deleteVariation = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VARIATION_DELETE_REQUEST,
    });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.success.token}`,
      },
    };

    await axios.delete(`${BASE_URL}api/v2/admin/variation/${id}`, config);

    dispatch({
      type: VARIATION_DELETE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      ///dispatch(logout())
    }
    dispatch({
      type: VARIATION_DELETE_FAIL,
      payload: message,
    });
  }
};

export const deleteVariationImage =
  (url, varId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: VARIATION_IMAGE_DELETE_REQUEST,
      });

      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.success.token}`,
        },
      };

      let formdata = new FormData();


      formdata.set("url", url);
      formdata.set("variation_id", varId);

      await axios.post(
        `${BASE_URL}api/v2/admin/deletevariationimage`,
        formdata,
        config
      );

      dispatch({
        type: VARIATION_IMAGE_DELETE_SUCCESS,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        ///dispatch(logout())
      }
      dispatch({
        type: VARIATION_IMAGE_DELETE_FAIL,
        payload: message,
      });
    }
  };
