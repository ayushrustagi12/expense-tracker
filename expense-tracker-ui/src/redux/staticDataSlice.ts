import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "@/redux/store";

interface Category {
  id: number;
  name: string;
  type: "income" | "expense";
}

interface StaticDataState {
  categories: Category[]; // flat array
  modes: string[];
  currencies: string[];
  loading: boolean;
  error: string | null;
}

const initialState: StaticDataState = {
  categories: [], // not split
  modes: [],
  currencies: [],
  loading: false,
  error: null,
};

export const fetchStaticData = createAsyncThunk(
  "staticData/fetchStaticData",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/static-data",
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch static data"
      );
    }
  }
);

const staticDataSlice = createSlice({
  name: "staticData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStaticData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStaticData.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.categories; // keep flat array
        state.modes = action.payload.modes;
        state.currencies = action.payload.currencies;
      })

      .addCase(fetchStaticData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectFetchStaticData = (state: RootState) => ({
  categories: state.staticData.categories,
  modes: state.staticData.modes,
  currencies: state.staticData.currencies,
  loading: state.staticData.loading,
  error: state.staticData.error,
});

export default staticDataSlice.reducer;
