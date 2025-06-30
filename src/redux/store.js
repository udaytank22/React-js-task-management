import { configureStore } from "@reduxjs/toolkit";
import { taskReducer, projectReducer, authReducer } from "./taskSlice";

export const store = configureStore({
  reducer: {
    authReducer: authReducer,
    tasks: taskReducer,
    projects: projectReducer,
  },
});
