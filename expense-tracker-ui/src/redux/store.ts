import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import staticDataReducer from "./staticDataSlice";
import accountReducer from "./accountSlice";
import cardReducer from "./cardSlice";
import transactionReducer from "./transactionSlice";
import budgetReducer from "./budgetSlice";
import emiReducer from "./emiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    staticData: staticDataReducer,
    accountData: accountReducer,
    cardData: cardReducer,
    transactionData: transactionReducer,
    budgetData: budgetReducer,
    emiData: emiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
