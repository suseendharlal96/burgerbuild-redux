import * as actionTypes from "../actions/actionTypes";

const initialState = {
  localId: null,
  idToken: null,
  loading: false,
  error: null,
};

const authStore = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        localId: action.localId,
        idToken: action.idToken,
        loading: false,
        error: null,
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        loading: false,
        error: null,
        localId: null,
        idToken: null,
      };
    default:
      return state;
  }
};

export default authStore;
