import {
  SHOP_FAIL,
  SHOP_REQUEST,
  SHOP_SUCCESS,
} from "../constants/shopConstants";

export const shopReducer = (state = { shop: [] }, action) => {
  switch (action.type) {
    case SHOP_REQUEST:
      return { loading: true, shop: [] };
    case SHOP_SUCCESS:
        
      return {
        loading: false,
        shop: action.payload.data,
       // pages: action.payload.last_page,
       // page: action.payload.current_page,
      };
    case SHOP_FAIL:
      return { loading: false, shopError: action.payload };
    default:
      return state;
  }
};
