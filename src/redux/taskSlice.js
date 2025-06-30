import { createSlice } from "@reduxjs/toolkit";

import projectData from "../data/projects.json";
import taskData from "../data/tasks.json";

const extractModules = (projects) => {
  const modules = [];
  const seen = new Set();
  console.log("modules", modules);
  projects.forEach((project) => {
    project.modules.forEach((mod) => {
      const key = `${mod.module_name}`;
      if (!seen.has(key)) {
        modules.push(mod);
        seen.add(key);
      }
    });
  });

  return modules;
};

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

// Module slice
// const moduleSlice = createSlice({
//   name: "modules",
//   initialState: moduleInitialState,
//   reducers: {
//     addModule: (state, action) => {
//       state.push(action.payload);
//     },
//     updateModule: (state, action) => {
//       const { id, module_name, description } = action.payload;
//       const module = state.find((m) => m.id === id);
//       if (module) {
//         module.module_name = module_name;
//         module.description = description;
//       }
//     },
//   },
// });

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

// Export reducers
export const taskReducer = taskSlice.reducer;
// export const moduleReducer = moduleSlice.reducer;
export const projectReducer = projectSlice.reducer;
