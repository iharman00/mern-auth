import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userInfo: {
    _id: null,
    name: null,
    email: null,
  },
  loading: false,
};

const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, { rejectWithValue }) => {
    const { name, email, password } = user;
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/auth/register",
        {
          name,
          email,
          password,
        }
      );
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
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.userInfo = {
          _id: null,
          name: null,
          email: null,
        };
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        const { _id, name, email } = action.payload.user;
        state.userInfo = {
          _id,
          name,
          email,
        };
        // Sets userInfo in local storage if request succeeds
        localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.userInfo = {
          _id: null,
          name: null,
          email: null,
        };
        state.loading = false;
      });
  },
});

export { registerUser };
export default userSlice.reducer;
