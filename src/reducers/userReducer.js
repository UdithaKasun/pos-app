import {
  AUTHENTICATE_USER,
  AUTHENTICATE_USER_SUCCESS,
  AUTHENTICATE_USER_FAILURE,
  VERIFY_TOKEN,
  VERIFY_TOKEN_SUCCESS,
  VERIFY_TOKEN_FAILURE,
  LOG_OUT_USER
} from "../actions/actionTypes";

const initialState = {
  token: null,
  loading: false,
  error: null,
  authenticated: false
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return {
        ...state,
        loading: true,
        error: null
      };

    case AUTHENTICATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        authenticated: true
      };

    case AUTHENTICATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error.message,
        token: null,
        authenticated: false
      };

    case VERIFY_TOKEN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case VERIFY_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        authenticated: true
      };

    case VERIFY_TOKEN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error.message,
        token: null,
        authenticated: false
      };

    case LOG_OUT_USER:
      return {
        ...state,
        loading: false,
        error: null,
        token: null,
        authenticated: false
      };

    default:
      return state;
  }
}
