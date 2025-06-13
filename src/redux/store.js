import { configureStore } from "@reduxjs/toolkit";
import { taskReducer, moduleReducer, projectReducer } from "./taskSlice";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    modules: moduleReducer,
    projects: projectReducer,
  },
});
