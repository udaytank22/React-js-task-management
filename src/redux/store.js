import { configureStore } from "@reduxjs/toolkit";
import {
  taskReducer,
  projectReducer,
  authReducer,
  attendanceReducer,
  profileReducer,
  leaveReducer,
} from "./taskSlice";

export const store = configureStore({
  reducer: {
    authReducer: authReducer,
    tasks: taskReducer,
    projects: projectReducer,
    attendance: attendanceReducer,
    profile: profileReducer,
    leave: leaveReducer,
  },
});
