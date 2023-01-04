import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice";
import authTokenReducer from "./Slices/authTokenSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    authToken: authTokenReducer,
  },
});

export default store;
