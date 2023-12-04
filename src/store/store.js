import { configureStore } from "@reduxjs/toolkit"; // that is how we create the store
// redux-slices
import gamePlayReducer from "./slices/gamePlaySlice";

export const store = configureStore({
  reducer: {
    gamePlay: gamePlayReducer,
  },
});
