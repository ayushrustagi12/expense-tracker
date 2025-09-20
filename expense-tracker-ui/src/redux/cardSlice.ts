import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { getAxiosConfig } from "../utils/csrf";

interface Card {
  id: number;
  user_id: number;
  account_name: string;
  account_category: "credit_card" | "debit_card";
  balance: number;
  currency: string;
  status: "active" | "inactive";
  notes?: string;
  created_at: string;
  updated_at: string;
  creditCardDetails?: {
    id: number;
    account_id: number;
    holder_name: string;
    bank_name: string;
    card_number: string;
    billing_cycle_day: number;
    is_auto_debit_enabled: boolean;
  };
  debitCardDetails?: {
    id: number;
    account_id: number;
    holder_name: string;
    bank_name: string;
    card_number: string;
    linked_bank_account_id?: number;
  };
}

interface CardState {
  cards: Card[];
  isLoading: boolean;
  error: string | null;
}

const API_URL = "http://localhost:8000/api";

const initialState: CardState = {
  cards: [],
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchCards = createAsyncThunk(
  "cards/fetchCards",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/cards`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch cards"
      );
    }
  }
);

export const addCreditCard = createAsyncThunk(
  "cards/addCreditCard",
  async (
    cardData: {
      card_name: string;
      holder_name: string;
      bank_name: string;
      card_number: string;
      billing_cycle_day?: number;
      is_auto_debit_enabled?: boolean;
      currency?: string;
      notes?: string;
    },
    thunkAPI
  ) => {
    try {
      const config = await getAxiosConfig();
      const response = await axios.post(
        `${API_URL}/credit-cards`,
        cardData,
        config
      );
      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add credit card"
      );
    }
  }
);

export const addDebitCard = createAsyncThunk(
  "cards/addDebitCard",
  async (
    cardData: {
      card_name: string;
      holder_name: string;
      bank_name: string;
      card_number: string;
      linked_bank_account_id?: number;
      currency?: string;
      notes?: string;
    },
    thunkAPI
  ) => {
    try {
      const config = await getAxiosConfig();
      const response = await axios.post(
        `${API_URL}/debit-cards`,
        cardData,
        config
      );
      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add debit card"
      );
    }
  }
);

export const updateCard = createAsyncThunk(
  "cards/updateCard",
  async (
    { id, cardData }: { id: number; cardData: Partial<Card> },
    thunkAPI
  ) => {
    try {
      const config = await getAxiosConfig();
      const response = await axios.put(
        `${API_URL}/cards/${id}`,
        cardData,
        config
      );
      return { id, data: response.data };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update card"
      );
    }
  }
);

export const deleteCard = createAsyncThunk(
  "cards/deleteCard",
  async (id: number, thunkAPI) => {
    try {
      const config = await getAxiosConfig();
      await axios.delete(`${API_URL}/cards/${id}`, config);
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete card"
      );
    }
  }
);

const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch cards
      .addCase(fetchCards.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCards.fulfilled, (state, action: PayloadAction<Card[]>) => {
        state.isLoading = false;
        state.cards = action.payload;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Add credit card
      .addCase(addCreditCard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        addCreditCard.fulfilled,
        (state, action: PayloadAction<Card>) => {
          state.isLoading = false;
          state.cards.push(action.payload);
        }
      )
      .addCase(addCreditCard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Add debit card
      .addCase(addDebitCard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addDebitCard.fulfilled, (state, action: PayloadAction<Card>) => {
        state.isLoading = false;
        state.cards.push(action.payload);
      })
      .addCase(addDebitCard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Update card
      .addCase(updateCard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCard.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.cards.findIndex(
          (card) => card.id === action.payload.id
        );
        if (index !== -1) {
          state.cards[index] = {
            ...state.cards[index],
            ...action.payload.data,
          };
        }
      })
      .addCase(updateCard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Delete card
      .addCase(deleteCard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCard.fulfilled, (state, action: PayloadAction<number>) => {
        state.isLoading = false;
        state.cards = state.cards.filter((card) => card.id !== action.payload);
      })
      .addCase(deleteCard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = cardSlice.actions;
export default cardSlice.reducer;
