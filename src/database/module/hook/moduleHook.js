import { use, useCallback, useEffect, useState } from "react";
import { addModule, getAllModules } from "../moduleHelperService";

export function useModuleHook() {
  const [module, setModule] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch all module
  // This function retrieves all module from the IndexedDB database.
  // It uses the getAllProjects helper function to fetch the data,
  // and manages the loading state during the operation.
  // It also sets the fetched module to the state variable 'module'.s
  const modules = useCallback(async (id) => {
    setLoading(true);
    try {
      const projectModules = await getAllModules();
      console.log("Fetched modules:", projectModules);
      setModule(projectModules);
    } catch (error) {
      console.error("Error fetching modules:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // useEffect to fetch module when the component mounts
  // useEffect(() => {
  //   modules();
  // }, [modules]);

  useEffect(() => {
    if (module) {
      console.log("module send to api");
      // project(); // Fetch module if the list is empty÷
    }
  }, [module]);

  // Function to create a new project
  // This function adds a new project to the IndexedDB database.
  // It takes the project data as an argument, adds it to the database,
  // and refreshes the project list.
  // It also manages the loading state during the operation.
  async function createModule(moduleData) {
    console.log("Creating module with data:", moduleData);
    try {
      await addModule(moduleData);
      await modules()
    } catch (err) {
      console.error("Error adding module:", err);
    }
  }

  return {
    module, // List of module
    loading, // Loading state for the project operations
    createModule, // Function to create a new project
    refreshModules: async () => setModule(await getAllModules()), // Expose the refresh function
  };
}
