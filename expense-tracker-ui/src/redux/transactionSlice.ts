import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Transaction {
  id: number;
  user_id: number;
  account_id: number;
  category_id?: number;
  amount: number;
  type: "income" | "expense";
  date: string;
  description?: string;
  created_at: string;
  updated_at: string;
  category?: {
    id: number;
    name: string;
    type: "income" | "expense";
  };
  account?: {
    id: number;
    account_name: string;
    account_category: string;
  };
}

interface TransactionStats {
  total_income: number;
  total_expense: number;
  net_savings: number;
  savings_rate: number;
  income_count: number;
  expense_count: number;
}

interface CategoryStats {
  category_id: number;
  type: "income" | "expense";
  total_amount: number;
  transaction_count: number;
  category?: {
    id: number;
    name: string;
    type: "income" | "expense";
  };
}

interface TransactionState {
  transactions: Transaction[];
  stats: TransactionStats | null;
  categoryStats: CategoryStats[];
  isLoading: boolean;
  error: string | null;
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  } | null;
}

const API_URL = "http://localhost:8000/api";

const initialState: TransactionState = {
  transactions: [],
  stats: null,
  categoryStats: [],
  isLoading: false,
  error: null,
  pagination: null,
};

// Async thunks
export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async (
    params: {
      page?: number;
      per_page?: number;
      type?: "income" | "expense";
      category_id?: number;
      account_id?: number;
      start_date?: string;
      end_date?: string;
      month?: number;
      year?: number;
      search?: string;
    } = {},
    thunkAPI
  ) => {
    try {
      const response = await axios.get(`${API_URL}/transactions`, {
        params,
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch transactions"
      );
    }
  }
);

export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (
    transactionData: {
      account_id: number;
      category_id?: number;
      amount: number;
      type: "income" | "expense";
      date: string;
      description?: string;
    },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(
        `${API_URL}/transactions`,
        transactionData,
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add transaction"
      );
    }
  }
);

export const updateTransaction = createAsyncThunk(
  "transactions/updateTransaction",
  async (
    {
      id,
      transactionData,
    }: { id: number; transactionData: Partial<Transaction> },
    thunkAPI
  ) => {
    try {
      const response = await axios.put(
        `${API_URL}/transactions/${id}`,
        transactionData,
        {
          withCredentials: true,
        }
      );
      return { id, data: response.data.data };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update transaction"
      );
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (id: number, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}/transactions/${id}`, {
        withCredentials: true,
      });
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete transaction"
      );
    }
  }
);

export const fetchTransactionStats = createAsyncThunk(
  "transactions/fetchStats",
  async (
    params: {
      start_date?: string;
      end_date?: string;
      month?: number;
      year?: number;
    } = {},
    thunkAPI
  ) => {
    try {
      const response = await axios.get(`${API_URL}/transactions-stats`, {
        params,
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch transaction stats"
      );
    }
  }
);

export const fetchCategoryStats = createAsyncThunk(
  "transactions/fetchCategoryStats",
  async (
    params: {
      start_date?: string;
      end_date?: string;
      month?: number;
      year?: number;
    } = {},
    thunkAPI
  ) => {
    try {
      const response = await axios.get(
        `${API_URL}/transactions-category-stats`,
        {
          params,
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch category stats"
      );
    }
  }
);

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearTransactions(state) {
      state.transactions = [];
      state.pagination = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch transactions
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload.data;
        state.pagination = {
          current_page: action.payload.current_page,
          last_page: action.payload.last_page,
          per_page: action.payload.per_page,
          total: action.payload.total,
        };
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Add transaction
      .addCase(addTransaction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        addTransaction.fulfilled,
        (state, action: PayloadAction<Transaction>) => {
          state.isLoading = false;
          state.transactions.unshift(action.payload);
        }
      )
      .addCase(addTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Update transaction
      .addCase(updateTransaction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.transactions.findIndex(
          (transaction) => transaction.id === action.payload.id
        );
        if (index !== -1) {
          state.transactions[index] = {
            ...state.transactions[index],
            ...action.payload.data,
          };
        }
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Delete transaction
      .addCase(deleteTransaction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        deleteTransaction.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.isLoading = false;
          state.transactions = state.transactions.filter(
            (transaction) => transaction.id !== action.payload
          );
        }
      )
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Fetch stats
      .addCase(fetchTransactionStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchTransactionStats.fulfilled,
        (state, action: PayloadAction<TransactionStats>) => {
          state.isLoading = false;
          state.stats = action.payload;
        }
      )
      .addCase(fetchTransactionStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Fetch category stats
      .addCase(fetchCategoryStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchCategoryStats.fulfilled,
        (state, action: PayloadAction<CategoryStats[]>) => {
          state.isLoading = false;
          state.categoryStats = action.payload;
        }
      )
      .addCase(fetchCategoryStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearTransactions } = transactionSlice.actions;
export default transactionSlice.reducer;
