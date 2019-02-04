import {
  FETCH_ORDERS_BEGIN,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
  FETCH_ITEMS_PER_ORDER_BEGIN,
  FETCH_ITEMS_PER_ORDER_SUCCESS,
  FETCH_ITEMS_PER_ORDER_FAILURE,
  ADD_NEW_ITEM_CURRENT_ORDER,
  UPDATE_ITEM_QUANTITY_CURRENT_ORDER,
  UPDATE_ITEM_ID_CURRENT_ORDER,
  REMOVE_ITEM_CURRENT_ORDER,
  UPDATE_ORDER_BEGIN,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAILURE,
  DELETE_ORDER_BEGIN,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAILURE,
  ADD_NEW_ORDER_BEGIN,
  ADD_NEW_ORDER_SUCCESS,
  ADD_NEW_ORDER_FAILURE
} from "./actionTypes";

import OrderService from "../services/Order.service";
import { notify } from "react-notify-toast";

export const fetchOrdersBegin = () => ({
  type: FETCH_ORDERS_BEGIN
});

export const fetchOrdersSuccess = orders => ({
  type: FETCH_ORDERS_SUCCESS,
  payload: { orders }
});

export const fetchOrdersFailure = error => ({
  type: FETCH_ORDERS_FAILURE,
  payload: { error }
});

export const fetchOrders = () => {
  return async dispatch => {
    dispatch(fetchOrdersBegin());
    try {
      const { data } = await OrderService.getAllOrders();
      dispatch(fetchOrdersSuccess(data));
    } catch (err) {
      console.log(err.data);
    }
  };
};

export const fetchOrderItemsBegin = () => ({
  type: FETCH_ITEMS_PER_ORDER_BEGIN
});

export const fetchOrderItemsSuccess = currentOrderItems => ({
  type: FETCH_ITEMS_PER_ORDER_SUCCESS,
  payload: { currentOrderItems }
});

export const fetchOrderItemsFailure = error => ({
  type: FETCH_ITEMS_PER_ORDER_FAILURE,
  payload: { error }
});

export const fetchItemsPerOrder = orderId => {
  return async dispatch => {
    dispatch(fetchOrderItemsBegin());
    try {
      const { data } = await OrderService.getItemsPerOrder(orderId);
      dispatch(fetchOrderItemsSuccess(data));
    } catch (err) {}
  };
};

export const addNewItemToCurrentOrder = () => ({
  type: ADD_NEW_ITEM_CURRENT_ORDER,
  payload: {
    id: -1,
    itemName: null,
    itemPrice: null,
    itemQuantity: null
  }
});

export const updateItemQuantity = (itemIndex, quantity) => ({
  type: UPDATE_ITEM_QUANTITY_CURRENT_ORDER,
  payload: {
    itemIndex,
    quantity
  }
});

export const updateItemId = (itemIndex, id) => ({
  type: UPDATE_ITEM_ID_CURRENT_ORDER,
  payload: {
    itemIndex,
    id
  }
});

export const removeItemFromCurrentOrder = itemIndex => ({
  type: REMOVE_ITEM_CURRENT_ORDER,
  payload: {
    itemIndex
  }
});

export const addNewOrderBegin = () => ({
  type: ADD_NEW_ORDER_BEGIN
});

export const addNewOrderSuccess = newOrder => ({
  type: ADD_NEW_ORDER_SUCCESS,
  payload: newOrder
});

export const addNewOrderFailure = error => ({
  type: ADD_NEW_ORDER_FAILURE,
  payload: { error }
});

export const addNewOrder = () => {
  return async dispatch => {
    dispatch(addNewOrderBegin());
    try {
      const { data } = await OrderService.addNewOrder();
      dispatch(addNewOrderSuccess(data));
    } catch (err) {
      dispatch(addNewOrderFailure());
    }
  };
};

export const updateOrderBegin = () => ({
  type: UPDATE_ORDER_BEGIN
});

export const updateOrderSuccess = () => ({
  type: UPDATE_ORDER_SUCCESS,
  payload: {}
});

export const updateOrderFailure = error => ({
  type: UPDATE_ORDER_FAILURE,
  payload: { error }
});

export const updateOrder = (orderId, orderItems) => {
  return async dispatch => {
    dispatch(updateOrderBegin());
    try {
      orderItems = orderItems.map(item => ({
        ItemId: item.id,
        Quantity: item.itemQuantity
      }));
      await OrderService.updateOrder(orderId, { items: orderItems });
      dispatch(updateOrderSuccess());
      dispatch(fetchOrders());
      notify.show(
        `Order Number [${orderId}] has been updated successfully`,
        "success"
      );
    } catch (err) {
      console.log(err);
      notify.show(
        `Something went wrong updating Order Number [${orderId}]`,
        "error"
      );
    }
  };
};

export const deleteOrderBegin = () => ({
  type: DELETE_ORDER_BEGIN
});

export const deleteOrderSuccess = () => ({
  type: DELETE_ORDER_SUCCESS,
  payload: {}
});

export const deleteOrderFailure = error => ({
  type: DELETE_ORDER_FAILURE,
  payload: { error }
});

export const deleteOrder = orderId => {
  return async dispatch => {
    dispatch(deleteOrderBegin());
    try {
      await OrderService.deleteOrder(orderId);
      dispatch(deleteOrderSuccess());
      dispatch(fetchOrders());
      notify.show(`Order Number [${orderId}] has been discarded`, "warning");
    } catch (err) {
      console.error(err);
    }
  };
};
