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

export const setOrderSuccess = (orderData) => {
  return {
    type: actionTypes.PLACE_ORDER_SUCCESS,
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
        console.log(response);
        console.log(orderData);
        const order = { ...orderData, id: response.data.name };
        console.log(order);
        dispatch(setOrderSuccess(order));
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

export const deleteStateOrder = (id) => {
  return {
    type: actionTypes.DELETE_ORDER,
    delId: id,
  };
};

export const initDel = () => {
  return {
    type: actionTypes.INIT_DELETE,
  };
};

export const deleteOrder = (id, obj) => {
  return (dispatch) => {
    dispatch(initDel());
    axios
      .delete(`/orders/${id}.json`)
      .then((res) => {
        console.log(res);
        console.log(obj);
        dispatch(deleteStateOrder(id));
        obj.history.replace("/orders");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
