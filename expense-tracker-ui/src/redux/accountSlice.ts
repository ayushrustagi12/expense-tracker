import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAxiosConfig } from "../utils/csrf";

export const addAccount = createAsyncThunk(
  "accounts/addAccount",
  async (
    accountData: {
      accountName: string;
      accountNumber: string;
      accountType: "Savings" | "Current";
      initialBalance?: string;
      bankName: string;
      holderName: string;
      branch: string;
      notes?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const payload = {
        account_name: accountData.accountName,
        account_category: accountData.accountType.toLowerCase(),
        balance: accountData.initialBalance
          ? parseFloat(accountData.initialBalance)
          : 0,
        currency: "INR",
        status: "active",
        notes: accountData.notes || null,
        details: {
          bank_name: accountData.bankName,
          account_number: accountData.accountNumber,
          account_type: accountData.accountType.toLowerCase(),
          holder_name: accountData.holderName,
          branch: accountData.branch,
        },
      };

      const response = await axiosInstance.post("/api/accounts", payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAccounts = createAsyncThunk(
  "accounts/fetchAccounts",
  async (_, { rejectWithValue }) => {
    try {
      const config = await getAxiosConfig();
      const response = await axios.get(
        "http://localhost:8000/api/accounts",
        config
      );
      return response.data; // array of accounts
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const accountsSlice = createSlice({
  name: "accounts",
  initialState: {
    list: [] as any[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(addAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAccounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default accountsSlice.reducer;
