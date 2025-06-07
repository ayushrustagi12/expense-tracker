import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const API_URL = "http://localhost:8000/api";
const CSRF_URL = "http://localhost:8000/sanctum/csrf-cookie";

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

const getCSRF = async () => {
  await axios.get(CSRF_URL, { withCredentials: true });
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    formData: { name: string; email: string; password: string },
    thunkAPI
  ) => {
    try {
      await getCSRF();
      const token = decodeURIComponent(Cookies.get("XSRF-TOKEN"));
      const response = await axios.post(`${API_URL}/register`, formData, {
        withCredentials: true,
        headers: {
          "X-XSRF-TOKEN": token || "",
        },
      });

      return response.data.user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    {
      email,
      password,
      navigate,
      remember,
    }: {
      email: string;
      password: string;
      navigate: (path: string) => void;
      remember: boolean;
    },
    thunkAPI
  ) => {
    try {
      await getCSRF();
      const token = decodeURIComponent(Cookies.get("XSRF-TOKEN"));

      const response = await axios.post(
        `${API_URL}/login`,
        { email, password, remember },
        {
          withCredentials: true,
          headers: {
            "X-XSRF-TOKEN": token || "",
          },
        }
      );

      await thunkAPI.dispatch(fetchCurrentUser() as any);
      navigate("/dashboard");

      return response.data.user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    await getCSRF();
    const token = decodeURIComponent(Cookies.get("XSRF-TOKEN"));
    try {
      await axios.post(
        `${API_URL}/logout`,
        {},
        {
          withCredentials: true,
          headers: {
            "X-XSRF-TOKEN": token || "",
          },
        }
      );
      return null;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Logout failed"
      );
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/user`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        return thunkAPI.rejectWithValue(null);
      }
      return thunkAPI.rejectWithValue("Failed to fetch user");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchCurrentUser.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.isLoading = false;
          state.user = action.payload;
        }
      )
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
