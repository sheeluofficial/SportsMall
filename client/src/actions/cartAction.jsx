import {
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstant";
import axios from "axios";
import { api } from "../utils/api";

// Add to Cart
export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`${api}/api/v1/product/${id}`);

  console.log(data);
  dispatch({
    type: ADD_TO_CART,
    payload: {
      productId: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.Stock,
      quantity,
    },
  });

  // Save cart data to localStorage after dispatching the action
  localStorage.setItem("cartItem", JSON.stringify(getState().cart.cartItems));
};

// Remove item from Cart
export const removeItemFromCart = (id) => async (dispatch, getState) => {
  dispatch({ type: REMOVE_CART_ITEM, payload: id });

  // Save cart data to localStorage after dispatching the action
  localStorage.setItem("cartItem", JSON.stringify(getState().cart.cartItems));
};

// Save Shipping Info
export const saveShippingInfo = (data) => async (dispatch, getState) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  // Save shipping info data to localStorage after dispatching the action
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};

export const clearCart = () => async (dispatch,getStore) =>{
    
    // Update cart to its initial state.
    localStorage.setItem("shippingInfo", JSON.stringify({}));
    localStorage.setItem("cartItem", JSON.stringify([]));
    sessionStorage.setItem(
      "stripeApiKey",
      JSON.stringify("")
    );

    dispatch({type : CLEAR_CART, payload : {shippingInfo :{},
    cartItems:[]}});


}
