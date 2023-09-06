import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../redux/slice/authSlice";
import productReducer from "../redux/slice/productSlice";
import filterReducer from "../redux/slice/filterSlice";
import cartReducer from "../redux/slice/cartSlice";
import checkoutReducer from "../redux/slice/checkoutSlice";
import orderReducer from "../redux/slice/orderSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  filter: filterReducer,
  cart: cartReducer,
  checkout:checkoutReducer,
  orders: orderReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
