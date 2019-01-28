import {
    FETCH_ORDERS_BEGIN,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAILURE
  } from '../actions/orderActions';
  
  const initialState = {
    items: [],
    currentOrders: [],
    currentOrderItems: [],
    loading: false,
    error: null
  };
  
  export default function productReducer(state = initialState, action) {
    switch(action.type) {
      case FETCH_ORDERS_BEGIN:
        return {
          ...state,
          loading: true,
          error: null
        };
  
      case FETCH_ORDERS_SUCCESS:
        return {
          ...state,
          loading: false,
          currentOrders: action.payload.orders
        };
  
      case FETCH_ORDERS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          currentOrders: []
        };
  
      default:
        return state;
    }
  }