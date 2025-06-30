import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import projectData from "../data/projects.json";
import taskData from "../data/tasks.json";
import users from "../data/user.json";
import { setToken as saveTokenToStorage } from "../utils/auth";

let staticUsers = [...users]; // mutable copy

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }, thunkAPI) => {
    const user = staticUsers.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      return { user, api_token: user.api_token };
    } else {
      return thunkAPI.rejectWithValue("Invalid username or password");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ username, password }, thunkAPI) => {
    const existingUser = staticUsers.find((u) => u.username === username);
    if (existingUser) {
      return thunkAPI.rejectWithValue("User already exists");
    }

    const newUser = {
      id: staticUsers.length + 1,
      name: username.charAt(0).toUpperCase() + username.slice(1),
      username,
      email: `${username}@example.com`,
      mobileNo: "+919999999999",
      role: "Staff",
      is_task_creater: false,
      staff_time_diff: "+05:30",
      api_token: `token_${username}_${Math.floor(Math.random() * 1000)}`,
      password,
    };

    staticUsers.push(newUser);
    return { user: newUser, api_token: newUser.api_token };
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, loading: false, error: null },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      // removeToken();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.api_token;
        state.error = null;
        saveTokenToStorage(action.payload.api_token);
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.api_token;
        state.error = null;
        saveTokenToStorage(action.payload.api_token);
      });
  },
});

// Initial States
const taskInitialState = taskData;
const projectInitialState = projectData;
// console.log("moduleInitialState",moduleInitialState);
// Task slice
const taskSlice = createSlice({
  name: "tasks",
  initialState: taskInitialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    updateTaskStatus: (state, action) => {
      const { id, status } = action.payload;
      const task = state.find((task) => task.id === id);
      if (task) {
        task.status = status;
      }
    },
  },
});

// Project slice
const projectSlice = createSlice({
  name: "projects",
  initialState: projectInitialState,
  reducers: {
    addProject: (state, action) => {
      state.push(action.payload);
    },
    updateProject: (state, action) => {
      const { id, project_name, description, start_date, end_date } =
        action.payload;
      const project = state.find((m) => m.id === id);
      if (project) {
        project.project_name = project_name;
        project.description = description;
        project.start_date = start_date;
        project.end_date = end_date;
      }
    },

    deleteProject: (state, action) => {
      return state.filter((p) => p.id !== action.payload);
    },

    addModuleToProject: (state, action) => {
      const { projectId, module } = action.payload;
      const project = state.find((p) => p.id === projectId);
      if (project) {
        if (!project.modules) {
          project.modules = [];
        }
        project.modules.push(module);
      }
    },
  },
});

// Export actions
export const { addTask, updateTaskStatus } = taskSlice.actions;
// export const { addModule, updateModule } = moduleSlice.actions;
export const { addProject, updateProject, deleteProject, addModuleToProject } =
  projectSlice.actions;
export const { logout } = authSlice.actions;

// Export reducers
export const taskReducer = taskSlice.reducer;
// export const moduleReducer = moduleSlice.reducer;
export const projectReducer = projectSlice.reducer;
export const authReducer = authSlice.reducer;
