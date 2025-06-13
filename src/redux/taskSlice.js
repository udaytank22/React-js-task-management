import { createSlice } from "@reduxjs/toolkit";

// static data
const taskInitialState = [
  {
    id: 1,
    task_name: "Develop New Feature",
    project: "Project Alpha",
    module: "Module A",
    type: "Development",
    status: "Pending",
  },
  {
    id: 2,
    task_name: "Fix Bug in Existing System",
    project: "Project Beta",
    module: "Module B",
    type: "Bug Fix",
    status: "Pending",
  },
  {
    id: 3,
    task_name: "Implement API Integration",
    project: "Project Gamma",
    module: "Module C",
    type: "Integration",
    status: "Working",
  },
  {
    id: 4,
    task_name: "Design User Interface",
    project: "Project Delta",
    module: "Module D",
    type: "Design",
    status: "Completed",
  },
  {
    id: 5,
    task_name: "Test Application Functionality",
    project: "Project Epsilon",
    module: "Module E",
    type: "Testing",
    status: "Pending",
  },
];

// module data
const moduleInitialState = [
  {
    id: 1,
    module_name: "User Authentication",
    description:
      "Handles user registration, login, password reset, and two-factor authentication.",
  },
  {
    id: 2,
    module_name: "Product Catalog",
    description:
      "Manages product listings, categories, product search, and filters.",
  },
  {
    id: 3,
    module_name: "Shopping Cart & Checkout",
    description:
      "Handles adding/removing products to cart, checkout process, and order summary.",
  },
  {
    id: 4,
    module_name: "Payment Gateway Integration",
    description:
      "Integrates multiple payment options including credit/debit cards, net banking, and wallets.",
  },
  {
    id: 5,
    module_name: "Order Management",
    description:
      "Tracks orders, shipping, delivery status, and order history for customers.",
  },
  {
    id: 6,
    module_name: "Customer Support",
    description:
      "Provides ticketing system, live chat, and FAQs for customer support.",
  },
  {
    id: 7,
    module_name: "Analytics & Reporting",
    description:
      "Generates sales reports, traffic analysis, and customer behavior insights.",
  },
];

// project data
const projectInitialState = [
  {
    id: 1,
    project_name: "E-Commerce Platform",
    description:
      "A complete e-commerce solution with admin panel, user portal, and payment gateway.",
    start_date: "2025-01-10",
    end_date: "2025-06-30",
    status: "In Progress",
  },
  {
    id: 2,
    project_name: "HR Management System",
    description:
      "Human resource management system with attendance, payroll, and leave management modules.",
    start_date: "2025-02-01",
    end_date: "2025-07-15",
    status: "Planning",
  },
  {
    id: 3,
    project_name: "Mobile Banking App",
    description:
      "Secure mobile application for online banking, fund transfers, and utility payments.",
    start_date: "2024-11-20",
    end_date: "2025-05-31",
    status: "Completed",
  },
];

// task slice
const taskSlice = createSlice({
  name: "tasks",
  initialState: taskInitialState,
  reducers: {
    // this will add the new data to array direct redux have an capability to add new data to array direct
    addTask: (state, action) => {
      state.push(action.payload);
    },

    // this will update the created task details find from the id and update it's status.
    updateTaskStatus: (state, action) => {
      const { id, status } = action.payload;
      const task = state.find((task) => task.id === id);
      if (task) {
        task.status = status;
      }
    },
  },
});

// module slice
const moduleSlice = createSlice({
  name: "modules",
  initialState: moduleInitialState,
  reducers: {
    addModule: (state, action) => {
      state.push(action.payload);
    },
    updateModule: (state, action) => {
      const { id, module_name, description } = action.payload;
      const module = state.find((m) => m.id === id);
      if (module) {
        module.module_name = module_name;
        module.description = description;
      }
    },
  },
});

// project slice
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
  },
});

export const { addTask, updateTaskStatus } = taskSlice.actions;
export const { addModule, updateModule } = moduleSlice.actions;
export const { addProject, updateProject, deleteProject } =
  projectSlice.actions;

export const taskReducer = taskSlice.reducer;
export const moduleReducer = moduleSlice.reducer;
export const projectReducer = projectSlice.reducer;
