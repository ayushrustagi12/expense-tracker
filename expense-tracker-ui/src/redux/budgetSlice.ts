import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Budget {
  id: number;
  user_id: number;
  category_id?: number;
  amount: number;
  month: string;
  created_at: string;
  updated_at: string;
  category?: {
    id: number;
    name: string;
    type: "income" | "expense";
  };
  spent_amount?: number;
  remaining_amount?: number;
  percentage_used?: number;
}

interface BudgetSummary {
  month: string;
  total_budget: number;
  total_spent: number;
  total_remaining: number;
  budget_count: number;
  overall_percentage_used: number;
  budgets: Budget[];
}

interface BudgetState {
  budgets: Budget[];
  summary: BudgetSummary | null;
  isLoading: boolean;
  error: string | null;
}

const API_URL = "http://localhost:8000/api";

const initialState: BudgetState = {
  budgets: [],
  summary: null,
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchBudgets = createAsyncThunk(
  "budgets/fetchBudgets",
  async (
    params: {
      month?: string;
      year?: string;
    } = {},
    thunkAPI
  ) => {
    try {
      const response = await axios.get(`${API_URL}/budgets`, {
        params,
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch budgets"
      );
    }
  }
);

export const addBudget = createAsyncThunk(
  "budgets/addBudget",
  async (
    budgetData: {
      category_id?: number;
      amount: number;
      month: string;
    },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(`${API_URL}/budgets`, budgetData, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add budget"
      );
    }
  }
);

export const updateBudget = createAsyncThunk(
  "budgets/updateBudget",
  async (
    { id, budgetData }: { id: number; budgetData: Partial<Budget> },
    thunkAPI
  ) => {
    try {
      const response = await axios.put(`${API_URL}/budgets/${id}`, budgetData, {
        withCredentials: true,
      });
      return { id, data: response.data.data };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update budget"
      );
    }
  }
);

export const deleteBudget = createAsyncThunk(
  "budgets/deleteBudget",
  async (id: number, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}/budgets/${id}`, {
        withCredentials: true,
      });
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete budget"
      );
    }
  }
);

export const fetchBudgetSummary = createAsyncThunk(
  "budgets/fetchSummary",
  async (
    params: {
      month?: string;
    } = {},
    thunkAPI
  ) => {
    try {
      const response = await axios.get(`${API_URL}/budgets-summary`, {
        params,
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch budget summary"
      );
    }
  }
);

const budgetSlice = createSlice({
  name: "budgets",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearBudgets(state) {
      state.budgets = [];
      state.summary = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch budgets
      .addCase(fetchBudgets.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchBudgets.fulfilled,
        (state, action: PayloadAction<Budget[]>) => {
          state.isLoading = false;
          state.budgets = action.payload;
        }
      )
      .addCase(fetchBudgets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Add budget
      .addCase(addBudget.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addBudget.fulfilled, (state, action: PayloadAction<Budget>) => {
        state.isLoading = false;
        state.budgets.push(action.payload);
      })
      .addCase(addBudget.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Update budget
      .addCase(updateBudget.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateBudget.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.budgets.findIndex(
          (budget) => budget.id === action.payload.id
        );
        if (index !== -1) {
          state.budgets[index] = {
            ...state.budgets[index],
            ...action.payload.data,
          };
        }
      })
      .addCase(updateBudget.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Delete budget
      .addCase(deleteBudget.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        deleteBudget.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.isLoading = false;
          state.budgets = state.budgets.filter(
            (budget) => budget.id !== action.payload
          );
        }
      )
      .addCase(deleteBudget.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Fetch summary
      .addCase(fetchBudgetSummary.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchBudgetSummary.fulfilled,
        (state, action: PayloadAction<BudgetSummary>) => {
          state.isLoading = false;
          state.summary = action.payload;
        }
      )
      .addCase(fetchBudgetSummary.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearBudgets } = budgetSlice.actions;
export default budgetSlice.reducer;
