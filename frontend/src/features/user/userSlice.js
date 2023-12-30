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

const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user, { rejectWithValue }) => {
    const { name, email, password } = user;
    try {
      const res = await axios.put("/api/users/profile", {
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

// Some utility functions
const startLoading = (state) => {
  state.loading = true;
};

const stopLoading = (state) => {
  state.loading = false;
};

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
      .addCase(registerUser.pending, startLoading)
      .addCase(registerUser.fulfilled, stopLoading)
      .addCase(registerUser.rejected, stopLoading)
      .addCase(loginUser.pending, startLoading)
      .addCase(loginUser.fulfilled, stopLoading)
      .addCase(loginUser.rejected, stopLoading)
      .addCase(logoutUser.pending, startLoading)
      .addCase(logoutUser.fulfilled, stopLoading)
      .addCase(logoutUser.rejected, stopLoading)
      .addCase(updateUser.pending, startLoading)
      .addCase(updateUser.fulfilled, stopLoading)
      .addCase(updateUser.rejected, stopLoading);
  },
});

export { registerUser, loginUser, logoutUser, updateUser };
export const { setCredentials, logout } = userSlice.actions;
export default userSlice.reducer;
