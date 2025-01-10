import { FETCH_USER, ADD_USER, EDIT_USER } from "../actionTypes/actionTypes";

const initialState = {
  dataList: [],
};

const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
      };
    case ADD_USER:
      return {
        ...state,
      };
    case EDIT_USER:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default userReducers;
