import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import productReducer from "./productSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    auth: authReducer,
  },
});

export default store;
