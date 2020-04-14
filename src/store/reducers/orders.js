import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const orderStore = (state = initialState, action) => {
  console.log("order", action);
  switch (action.type) {
    case actionTypes.INIT_ORDER:
      return {
        ...state,
        purchased: false,
      };
    case actionTypes.INIT_PURCHASE:
      return {
        ...state,
        loading: true,
        purchased: false,
      };
    case actionTypes.PLACE_ORDER_SUCCESS:
      return {
        ...state,
        orders: state.orders.concat(action.orderData),
        loading: false,
        purchased: true,
      };
    case actionTypes.PLACE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        purchased: false,
      };
    case actionTypes.SET_FETCHED_ORDERS:
      return {
        ...state,
        orders: action.orderData,
      };
    default:
      return state;
  }
};

export default orderStore;
