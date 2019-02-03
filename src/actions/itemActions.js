import {
  FETCH_ITEMS_BEGIN,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_FAILURE,
} from './actionTypes';

import ItemService from '../services/Item.service';

export const fetchItemsBegin = () => ({
  type: FETCH_ITEMS_BEGIN
});

export const fetchItemsSuccess = items => ({
  type: FETCH_ITEMS_SUCCESS,
  payload: { items }
});

export const fetchItemsFailure = error => ({
  type: FETCH_ITEMS_FAILURE,
  payload: { error }
});

export const fetchItems = () => {
    return async(dispatch) => {
      dispatch(fetchItemsBegin());
      try{
        const {data} = await ItemService.getAllItems();
        dispatch(fetchItemsSuccess(data));
      }catch(err){
        dispatch(fetchItemsFailure(err));
      }
    };
}