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

    ADD_NEW_ORDER_BEGIN,
    ADD_NEW_ORDER_SUCCESS,
    ADD_NEW_ORDER_FAILURE,
    DELETE_ORDER_BEGIN,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAILURE,

  } from '../actions/actionTypes';
  
  const initialState = {
    currentOrders: [],
    currentOrderItems: [],
    newOrder: {},
    loading: false,
    error: null,
    saving: false,
  };

  let currentOrderItems;
  
  export default function orderReducer(state = initialState, action) {
    switch(action.type) {
      case FETCH_ORDERS_BEGIN:
        return {
          ...state,
          currentOrders: [],
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
      
        case FETCH_ITEMS_PER_ORDER_BEGIN:
        return {
          ...state,
          loading: true,
          error: null
        };
  
      case FETCH_ITEMS_PER_ORDER_SUCCESS:
        return {
          ...state,
          loading: false,
          currentOrderItems: action.payload.currentOrderItems
        };
  
      case FETCH_ITEMS_PER_ORDER_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          currentOrderItems: []
        };

        case ADD_NEW_ORDER_BEGIN:
        return {
          ...state,
          loading: true,
          newOrder: {},
        };
  
      case ADD_NEW_ORDER_SUCCESS:
        return {
          ...state,
          loading: false,
          newOrder: action.payload
        };
  
      case ADD_NEW_ORDER_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          newOrder: {}
        };
      
      case ADD_NEW_ITEM_CURRENT_ORDER:
        return {
          ...state,
          currentOrderItems : [...state.currentOrderItems, action.payload]
        }

      case UPDATE_ITEM_QUANTITY_CURRENT_ORDER:
        currentOrderItems = [...state.currentOrderItems];
        currentOrderItems[action.payload.itemIndex].itemQuantity = action.payload.quantity;
        return {
          ...state,
          currentOrderItems,
        }
        case UPDATE_ITEM_ID_CURRENT_ORDER:
        currentOrderItems = [...state.currentOrderItems]
        currentOrderItems[action.payload.itemIndex].id = action.payload.id;
        return {
          ...state,
          currentOrderItems,
        }
        case REMOVE_ITEM_CURRENT_ORDER:
        currentOrderItems = state.currentOrderItems.filter((item,index)=>index!==action.payload.itemIndex);
        return {
          ...state,
          currentOrderItems,
        }
        case UPDATE_ORDER_BEGIN:
        return {
          ...state,
          saving: true,
        }
        case UPDATE_ORDER_SUCCESS:
        return {
          ...state,
          saving: false,
        }
        case UPDATE_ORDER_FAILURE:
        return {
          ...state,
          saving: false,
        }
        case DELETE_ORDER_BEGIN:
        return {
          ...state,
          saving: true,
        }
        case DELETE_ORDER_SUCCESS:
        return {
          ...state,
          saving: false,
        }
        case DELETE_ORDER_FAILURE:
        return {
          ...state,
          saving: false,
        }
      default:
        return state;
    }
  }