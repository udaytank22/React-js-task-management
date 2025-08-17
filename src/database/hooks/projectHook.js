import { use, useCallback, useEffect, useState } from "react";
import {
  addModule,
  addProject,
  deleteProject,
  getAllProjects,
  updateProjrct,
} from "../helperSearvice";

export function useProjectHook() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch all projects
  // This function retrieves all projects from the IndexedDB database.
  // It uses the getAllProjects helper function to fetch the data,
  // and manages the loading state during the operation.
  // It also sets the fetched projects to the state variable 'projects'.s
  const project = useCallback(async () => {
    setLoading(true);
    try {
      const allProjects = await getAllProjects();
      setProjects(allProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // useEffect to fetch projects when the component mounts
  useEffect(() => {
    project();
  }, [project]);

  useEffect(() => {
    if (projects.length === 5) {
      console.log("project send to api");
      // project(); // Fetch projects if the list is empty÷
    }
  }, [projects]);

  // Function to create a new project
  // This function adds a new project to the IndexedDB database.
  // It takes the project data as an argument, adds it to the database,
  // and refreshes the project list.
  // It also manages the loading state during the operation.
  async function createProject(projectData) {
    setLoading(true);
    try {
      await addProject(projectData);
      await project(); // Refresh the project list after adding a new project
    } catch (error) {
      console.error("Error creating project:", error);
    } finally {
      setLoading(false);
    }
  }

  // Function to remove a project
  // This function removes a project from the IndexedDB database.
  // It takes the project ID as an argument, deletes it from the database,
  // and refreshes the project list.
  // It also manages the loading state during the operation.
  async function removeProject(id) {
    setLoading(true);
    try {
      await deleteProject(id);
      await project(); // Refresh the project list after deleting a project
    } catch (error) {
      console.error("Error deleting project:", error);
    } finally {
      setLoading(false);
    }
  }

  // Function to update an existing project
  // This function updates an existing project in the IndexedDB database.
  // It takes the project data as an argument, updates it in the database,
  // and refreshes the project list.
  // It also manages the loading state during the operation.
  async function updateProject(projectData) {
    setLoading(true);
    try {
      await updateProjrct(projectData); // Assuming addProject can also update if the ID exists
      await project(); // Refresh the project list after updating a project
    } catch (error) {
      console.error("Error updating project:", error);
    } finally {
      setLoading(false);
    }
  }

  return {
    projects, // List of projects
    loading, // Loading state for the project operations
    createProject, // Function to create a new project
    removeProject, // Function to remove a project
    updateProject, // Function to update a project
    refreshProjects: async () => setProjects(await getAllProjects()), // Expose the refresh function
  };
}
