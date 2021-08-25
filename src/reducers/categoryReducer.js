import {
  CATEGORY_FAIL,
  CATEGORY_REQUEST,
  CATEGORY_SUCCESS,
} from "../constants/categoryConstants";

export const categoryReducer = (state = { category: [] }, action) => {
  switch (action.type) {
    case CATEGORY_REQUEST:
      return { loading: true, category: [] };
    case CATEGORY_SUCCESS:
       
      return {
        loading: false,
        category: action.payload
        // pages: action.payload.last_page,
        //page: action.payload.current_page,
      };
    case CATEGORY_FAIL:
      return { loading: false, categoryError: action.payload };
    default:
      return state;
  }
};
