import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_SUCCESS,
  CLEAR_ERRORS,
  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  MY_ORDER_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_FAIL,
  ALL_ORDERS_SUCCESS,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
} from "../constants/orderConstant";
import axios from "axios";
import { api } from "../utils/api";



export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(`${api}/api/v1/order/new`, order, config);
  console.log(data, "it is order data in order action");

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });


  
  } catch (error) {
    console.log(error, "it is errror data in order action");
    dispatch({ type: CREATE_ORDER_FAIL, payload: error.response.data.message });
  }
};

// get all orders
export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDER_REQUEST });

    const { data } = await axios.get(`${api}/api/v1/orders/myOrders`);

    console.log("order",data)
    dispatch({ type: MY_ORDER_SUCCESS, payload: data.orders });
  } catch (error) {
    console.log("order error",error)
    dispatch({ type: MY_ORDER_FAIL, payload: error.response.data.message });
  }
};

// get single order

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const { data } = await axios.get(`${api}/api/v1/order/${id}`);

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({ type: ORDER_DETAILS_FAIL, payload: error.response.data.message });
  }
};

export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });

    const { data } = await axios.get(`${api}/api/v1/admin/orders`);

    dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({ type: ALL_ORDERS_FAIL, payload: error.response.data.message });
  }
};


// delet Order --> admin
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });

    const { data } = await axios.delete(`${api}/api/v1/admin/order/${id}`);

    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: DELETE_ORDER_FAIL, payload: error.response.data.message });
  }
};

// update order --> admin (status update) 
export const updateOrder = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      `${api}/api/v1/admin/order/${id}`,
      productData,
      config
    );
    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: UPDATE_ORDER_FAIL, payload: error.response.data.message });
  }
};

// clear errors

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
