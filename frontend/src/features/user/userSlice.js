import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // gets user data from local storage if present(logged in), else sets it to null
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
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
});

export const { setCredentials, logout } = userSlice.actions;
export default userSlice.reducer;
