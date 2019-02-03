import { combineReducers } from "redux";
import orders from './orderReducer';
import items from './itemReducer';
import user from './userReducer';

export default combineReducers({
    orders,
    items,
    user,
});
