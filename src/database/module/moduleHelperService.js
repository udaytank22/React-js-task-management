import { getDB } from "./idbModuleConfig";

// Helper functions for managing modules in the IndexedDB database

// Function to get all modules
// This function retrieves all modules from the IndexedDB database.
// It returns a promise that resolves to an array of project objects.

// add new project
export async function addModule(project) {
  console.log("Adding module:", project);
  const db = await getDB();
  return db.add("modules", project);
}

// function to get project by ID
export async function getAllModules() {
  const db = await getDB();
  return db.getAll("modules");
}
