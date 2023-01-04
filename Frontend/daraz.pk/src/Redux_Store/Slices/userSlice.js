import { createSlice } from "@reduxjs/toolkit";

const userReducer = createSlice({
  name: "user",
  initialState: { user: "" },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state, action) {
      state.user = "";
    },
  },
});

export const { setUser, clearUser } = userReducer.actions;
export default userReducer.reducer;
