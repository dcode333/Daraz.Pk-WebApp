import { createSlice } from "@reduxjs/toolkit";

const authTokenReducer = createSlice({
  name: "authToken",
  initialState: { token: "" },
  reducers: {
    setAuthToken(state, action) {
      state.token = action.payload;
    },
    clearAuthToken(state) {
      state.token = "";
    },
  },
});

export const { setAuthToken, clearAuthToken } = authTokenReducer.actions;
export default authTokenReducer.reducer;
