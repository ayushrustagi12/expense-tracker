// src/redux/cardsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addCreditCard = createAsyncThunk(
  "cards/addCreditCard",
  async (
    creditCardData: {
      cardName: string;
      cardNumber: string;
      holderName: string;
      limit: string;
      billingDate: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const payload = {
        account_name: creditCardData.cardName,
        account_category: "credit_card",
        balance: 0,
        currency: "INR",
        status: "active",
        notes: null,
        details: {
          bank_name: creditCardData.cardName,
          card_number: creditCardData.cardNumber,
          holder_name: creditCardData.holderName,
          limit: creditCardData.limit,
          billing_cycle_day: parseInt(creditCardData.billingDate),
          is_auto_debit_enabled: false,
        },
      };

      const response = await axios.post("/api/accounts", payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addDebitCard = createAsyncThunk(
  "cards/addDebitCard",
  async (
    debitCardData: {
      cardName: string;
      cardNumber: string;
      holderName: string;
      linkedAccountId: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const payload = {
        account_name: debitCardData.cardName,
        account_category: "debit_card",
        balance: 0,
        currency: "INR",
        status: "active",
        notes: null,
        details: {
          bank_name: debitCardData.cardName,
          card_number: debitCardData.cardNumber,
          holder_name: debitCardData.holderName,
          linked_bank_account_id: debitCardData.linkedAccountId,
        },
      };

      const response = await axios.post("/api/accounts", payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const cardsSlice = createSlice({
  name: "cards",
  initialState: {
    list: [] as any[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCreditCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCreditCard.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(addCreditCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(addDebitCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDebitCard.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(addDebitCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default cardsSlice.reducer;
