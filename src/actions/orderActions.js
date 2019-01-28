import OrderService from '../services/Order.service';


export const FETCH_ORDERS_BEGIN   = 'FETCH_ORDERS_BEGIN';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_FAILURE = 'FETCH_ORDERS_FAILURE';

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
    return async(dispatch) => {
      dispatch(fetchOrdersBegin());
      try{
        const {data} = await OrderService.getAllOrders();
        dispatch(fetchOrdersSuccess(data))
      }catch(err){

      }
    };
  }