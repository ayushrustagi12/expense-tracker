import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface EMI {
  id: number;
  user_id: number;
  account_id: number;
  name: string;
  amount: number;
  total_installments: number;
  installments_paid: number;
  start_date: string;
  created_at: string;
  updated_at: string;
  account?: {
    id: number;
    account_name: string;
    account_category: string;
  };
  remaining_installments?: number;
  completion_percentage?: number;
  next_due_date?: string;
  is_completed?: boolean;
}

interface UpcomingPayment {
  id: number;
  name: string;
  amount: number;
  due_date: string;
  account: {
    id: number;
    account_name: string;
    account_category: string;
  };
  remaining_installments: number;
}

interface EMISummary {
  total_emis: number;
  active_emis: number;
  completed_emis: number;
  total_monthly_emi: number;
}

interface EMIState {
  emis: EMI[];
  upcomingPayments: UpcomingPayment[];
  summary: EMISummary | null;
  isLoading: boolean;
  error: string | null;
}

const API_URL = "http://localhost:8000/api";

const initialState: EMIState = {
  emis: [],
  upcomingPayments: [],
  summary: null,
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchEMIs = createAsyncThunk(
  "emis/fetchEMIs",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/emis`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch EMIs"
      );
    }
  }
);

export const addEMI = createAsyncThunk(
  "emis/addEMI",
  async (
    emiData: {
      account_id: number;
      name: string;
      amount: number;
      total_installments: number;
      start_date: string;
    },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(`${API_URL}/emis`, emiData, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add EMI"
      );
    }
  }
);

export const updateEMI = createAsyncThunk(
  "emis/updateEMI",
  async ({ id, emiData }: { id: number; emiData: Partial<EMI> }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_URL}/emis/${id}`, emiData, {
        withCredentials: true,
      });
      return { id, data: response.data.data };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update EMI"
      );
    }
  }
);

export const deleteEMI = createAsyncThunk(
  "emis/deleteEMI",
  async (id: number, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}/emis/${id}`, {
        withCredentials: true,
      });
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete EMI"
      );
    }
  }
);

export const markEMIPayment = createAsyncThunk(
  "emis/markPayment",
  async (
    { id, installments_to_pay }: { id: number; installments_to_pay: number },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(
        `${API_URL}/emis/${id}/mark-payment`,
        {
          installments_to_pay,
        },
        {
          withCredentials: true,
        }
      );
      return { id, data: response.data.data };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to mark EMI payment"
      );
    }
  }
);

export const fetchUpcomingPayments = createAsyncThunk(
  "emis/fetchUpcomingPayments",
  async (
    params: {
      days?: number;
    } = {},
    thunkAPI
  ) => {
    try {
      const response = await axios.get(`${API_URL}/emis-upcoming`, {
        params,
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch upcoming payments"
      );
    }
  }
);

export const fetchEMISummary = createAsyncThunk(
  "emis/fetchSummary",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/emis-summary`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch EMI summary"
      );
    }
  }
);

const emiSlice = createSlice({
  name: "emis",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearEMIs(state) {
      state.emis = [];
      state.upcomingPayments = [];
      state.summary = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch EMIs
      .addCase(fetchEMIs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEMIs.fulfilled, (state, action: PayloadAction<EMI[]>) => {
        state.isLoading = false;
        state.emis = action.payload;
      })
      .addCase(fetchEMIs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Add EMI
      .addCase(addEMI.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addEMI.fulfilled, (state, action: PayloadAction<EMI>) => {
        state.isLoading = false;
        state.emis.push(action.payload);
      })
      .addCase(addEMI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Update EMI
      .addCase(updateEMI.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateEMI.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.emis.findIndex(
          (emi) => emi.id === action.payload.id
        );
        if (index !== -1) {
          state.emis[index] = { ...state.emis[index], ...action.payload.data };
        }
      })
      .addCase(updateEMI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Delete EMI
      .addCase(deleteEMI.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteEMI.fulfilled, (state, action: PayloadAction<number>) => {
        state.isLoading = false;
        state.emis = state.emis.filter((emi) => emi.id !== action.payload);
      })
      .addCase(deleteEMI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Mark payment
      .addCase(markEMIPayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(markEMIPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.emis.findIndex(
          (emi) => emi.id === action.payload.id
        );
        if (index !== -1) {
          state.emis[index] = { ...state.emis[index], ...action.payload.data };
        }
      })
      .addCase(markEMIPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Fetch upcoming payments
      .addCase(fetchUpcomingPayments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchUpcomingPayments.fulfilled,
        (state, action: PayloadAction<UpcomingPayment[]>) => {
          state.isLoading = false;
          state.upcomingPayments = action.payload;
        }
      )
      .addCase(fetchUpcomingPayments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Fetch summary
      .addCase(fetchEMISummary.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchEMISummary.fulfilled,
        (state, action: PayloadAction<EMISummary>) => {
          state.isLoading = false;
          state.summary = action.payload;
        }
      )
      .addCase(fetchEMISummary.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearEMIs } = emiSlice.actions;
export default emiSlice.reducer;
