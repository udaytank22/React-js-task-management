import { configureStore } from "@reduxjs/toolkit";
import { taskReducer, projectReducer } from "./taskSlice";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    projects: projectReducer,
  },
});
