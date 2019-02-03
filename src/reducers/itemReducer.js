import {
    FETCH_ITEMS_BEGIN,
    FETCH_ITEMS_SUCCESS,
    FETCH_ITEMS_FAILURE,
  } from '../actions/actionTypes';
  
  const initialState = {
    items: [],
    loading: false,
    error: null
  };
  
  export default function itemReducer(state = initialState, action) {
    switch(action.type) {
      case FETCH_ITEMS_BEGIN:
        return {
          ...state,
          loading: true,
          error: null
        };
  
      case FETCH_ITEMS_SUCCESS:
        return {
          ...state,
          loading: false,
          items: action.payload.items
        };
  
      case FETCH_ITEMS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          items: []
        };
  
      default:
        return state;
    }
  }