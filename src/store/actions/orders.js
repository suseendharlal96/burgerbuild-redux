import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const initOrder = () => {
  return {
    type: actionTypes.INIT_ORDER,
  };
};
export const initPurchase = () => {
  return {
    type: actionTypes.INIT_PURCHASE,
  };
};

export const setOrderSuccess = (id, orderData) => {
  return {
    type: actionTypes.PLACE_ORDER_SUCCESS,
    id: id,
    orderData: orderData,
  };
};
export const setOrderFail = () => {
  return {
    type: actionTypes.PLACE_ORDER_FAIL,
  };
};

export const purchaseBurger = (orderData) => {
  return (dispatch) => {
    dispatch(initPurchase());
    axios
      .post("/orders.json", orderData)
      .then((response) => {
        dispatch(setOrderSuccess(response.data, orderData));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setOrderFail());
      });
  };
};

export const setFetchedOrders = (orderData) => {
  return {
    type: actionTypes.SET_FETCHED_ORDERS,
    orderData: orderData,
  };
};

export const fetchOrders = () => {
  return (dispatch) => {
    axios
      .get("/orders.json")
      .then((res) => {
        console.log(res.data);
        const a = [];
        for (let key in res.data) {
          a.push({ ...res.data[key], id: key });
        }
        dispatch(setFetchedOrders(a));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
