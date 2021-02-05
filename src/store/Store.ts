import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import transactionReducer from "./TransactionSlice";

const rootReducer = combineReducers({
  transaction: transactionReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});


type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof rootReducer>;
