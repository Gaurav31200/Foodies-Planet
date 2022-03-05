import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    userId: null,
    token: null,
    tokenExpirationDate: null,
  },
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = !!action.payload.token;
      state.userId = action.payload.uId;
      const tokenExpirationTime =
        action.payload.expirationTime ||
        new Date(new Date().getTime() + 1000 * 60 * 60);
      state.tokenExpirationDate = tokenExpirationTime.toString();
      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId: action.payload.uId,
          token: action.payload.token,
          expirationTime: tokenExpirationTime.toString(),
        })
      );
    },
    logout(state) {
      localStorage.removeItem("userData");
      state.tokenExpirationDate = null;
      state.isLoggedIn = false;
      state.token = null;
      state.userId = null;
    },
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
