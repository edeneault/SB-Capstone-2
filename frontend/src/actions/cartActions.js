import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_UPDATE_PAYMENT_METHOD_REQUEST,
  CART_UPDATE_PAYMENT_METHOD_SUCCESS,
  CART_UPDATE_PAYMENT_METHOD_FAIL,
} from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      description: data.description,
      brand: data.brand,
      category: data.category,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItem", JSON.stringify(getState().cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};

export const updatePaymentMethod =
  (paymentMethod, orderId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CART_UPDATE_PAYMENT_METHOD_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        `/api/orders/${orderId}/paymentmethod`,
        { paymentMethod: paymentMethod },
        config,
      );

      dispatch({
        type: CART_UPDATE_PAYMENT_METHOD_SUCCESS,
        payload: data,
      });

      localStorage.setItem("paymentMethod", JSON.stringify(data.paymentMethod));
    } catch (error) {
      dispatch({
        type: CART_UPDATE_PAYMENT_METHOD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
