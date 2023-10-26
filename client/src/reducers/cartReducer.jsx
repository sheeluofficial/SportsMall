import { ADD_TO_CART, CLEAR_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../constants/cartConstant";

export const initialStateCart = { cartItems: [], shippingInfo: {} };

export function cartReducer(state = initialStateCart, action) {

  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      // find if product exist in cartItem already
      const isExist = state.cartItems.find(cartItem => {
        return cartItem.productId === item.productId

      })
   
      console.log(action.payload);  
      // if exist alerady then replace same product 
      if (isExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem) => {

            return item.productId === cartItem.productId ? item : cartItem;
          }),
        };
      }
      // if not exist then add new item value into cartItem
      else {
        return {
          ...state,
          cartItems: [...state.cartItems, item]
        }
      }

    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.productId !== action.payload)
      }

    case SAVE_SHIPPING_INFO: return {
      ...state,
      shippingInfo:  action.payload,
      
    };
    case CLEAR_CART: return {
      ...state,
      shippingInfo:  action.payload.shippingInfo,
      cartItems : action.payload.cartItems
      
    };

    default: return state
  }


}


