import { getDB } from "./idbConfigand";

// Helper functions for managing projects in the IndexedDB database

// Function to get all projects
// This function retrieves all projects from the IndexedDB database.
// It returns a promise that resolves to an array of project objects.

// add new project
export async function addProject(project) {
  const db = await getDB();
  return db.add("projects", project);
}

// function to get project by ID
export async function getProjectById(id) {
  const db = await getDB();
  return db.get("projects", id);
}

export async function addModule(module) {
  console.log("Adding module:", module);
  const db = await getDB();
  return db.add("modules", module);
}

// function to get all projects
export async function getAllProjects() {
  const db = await getDB();
  return db.getAll("projects");
}

// update the project

// in this put means if new record are available with the same key then update it else add it
export async function updateProjrct(project) {
  const db = await getDB();
  return db.put("projects", project);
}

// delete project by ID
export async function deleteProject(id) {
  const db = await getDB();
  return db.delete("projects", id);
}

// clear all projects
export async function clearProjects() {
  const db = await getDB();
  return db.clear("projects");
}
