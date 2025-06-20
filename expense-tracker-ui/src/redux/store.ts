import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import staticDataReducer from "./staticDataSlice";
import accountReducer from "./accountSlice";
import cardReducer from "./cardsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    staticData: staticDataReducer,
    accountData: accountReducer,
    cardData: cardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
