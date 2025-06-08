import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import staticDataReducer from "./staticDataSlice";
import accountReducer from "./accountSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    staticData: staticDataReducer,
    accountData: accountReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
