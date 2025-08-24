import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../features/rootsReducer";

// Configure the Redux store
export const store = configureStore({
  reducer: rootReducer,
});

// Types for using in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
