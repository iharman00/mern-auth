import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  // gets user data from local storage if present(logged in), else sets it to null
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  loading: false,
};

const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, { rejectWithValue }) => {
    const { name, email, password } = user;
    try {
      const res = await axios.post("/api/users/auth/register", {
        name,
        email,
        password,
      });
      // returns server's response in action.payload
      return res.data;
    } catch (error) {
      // "?"" checks if response and data exists
      if (error.response?.data) {
        // assigns server's response.message to action.payload
        return rejectWithValue(error.response.data);
      } else {
        // assigns a generic error message to action.payload
        return rejectWithValue({ message: "An error occured" });
      }
    }
  }
);

const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, { rejectWithValue }) => {
    const { email, password } = user;
    try {
      const res = await axios.post("/api/users/auth/login", {
        email,
        password,
      });
      // returns server's response in action.payload
      return res.data;
    } catch (error) {
      // "?"" checks if response and data exists
      if (error.response?.data) {
        // assigns server's response.message to action.payload
        return rejectWithValue(error.response.data);
      } else {
        // assigns a generic error message to action.payload
        return rejectWithValue({ message: "An error occured" });
      }
    }
  }
);

const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/users/auth/logout");
      // returns server's response in action.payload
      return res.data;
    } catch (error) {
      // "?"" checks if response and data exists
      if (error.response?.data) {
        // assigns server's response.message to action.payload
        return rejectWithValue(error.response.data);
      } else {
        // assigns a generic error message to action.payload
        return rejectWithValue({ message: "An error occured" });
      }
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials(state, action) {
      const user = action.payload;
      state.userInfo = user;
      // Sets userInfo in local storage
      localStorage.setItem("userInfo", JSON.stringify(user));
    },
    logout(state) {
      state.userInfo = null;
      // Sets userInfo in local storage
      localStorage.removeItem("userInfo");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export { registerUser, loginUser, logoutUser };
export const { setCredentials, logout } = userSlice.actions;
export default userSlice.reducer;
