import { use, useCallback, useEffect, useState } from "react";
import {
  addModule,
  addProject,
  clearProjects,
  deleteProject,
  getAllProjects,
  updateProjrct,
} from "../helperSearvice";
import axios from "axios";
import { data } from "react-router-dom";

export function useProjectHook() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataAdded, setDataAdded] = useState(false);
  console.log("useProjectHook initialized", dataAdded);

  // Function to fetch all projects
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

  async function syncProjectsFromServer() {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/api/projects/");
      const serverProjects = res.data.results;
      console.log("Projects from server:", serverProjects);
      for (const project of serverProjects) {
        await addProject(project);
      }
      await project(); // refresh local state
    } catch (error) {
      console.error("Error syncing projects from server:", error);
    } finally {
      setLoading(false);
    }
  }

  const sendAllProjects = async () => {
    for (const project of projects) {
      const formData = new FormData();
      formData.append("project_name", project.project_name);
      formData.append("description", project.description);
      formData.append("start_date", project.start_date);
      formData.append("end_date", project.end_date);
      formData.append("status", project.status);

      try {
        const res = await axios.post("http://localhost:8000/api/projects/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("✅ Saved project:", res.data);
        const serverProjects = res.data;
        setDataAdded(true);
        await clearProjects(); // remove old data
        // await project(); // refresh the project list
        // await addProject([...projects, serverProjects]);
        await syncProjectsFromServer(); // Sync projects from server

        // 4. Update state for React UI
        // setProjects([...projects, serverProjects]);
      } catch (err) {
        console.error("❌ Error saving project:", err.response?.data || err.message);
      }
    }
  };

  // useEffect to fetch projects when the component mounts
  useEffect(() => {
    project();
  }, [project]);

  // useEffect(() => {
  //   // if (projects.length === 1) {
  //   console.log("projects send to api", projects);
  //   if (projects.length === 3 && dataAdded === false) {
  //     const sendAllProjects = async () => {
  //       for (const project of projects) {
  //         const formData = new FormData();
  //         formData.append("project_name", project.project_name);
  //         formData.append("description", project.description);
  //         formData.append("start_date", project.start_date);
  //         formData.append("end_date", project.end_date);
  //         formData.append("status", project.status);

  //         try {
  //           const res = await axios.post("http://localhost:8000/api/projects/", formData, {
  //             headers: { "Content-Type": "multipart/form-data" },
  //           });
  //           console.log("✅ Saved project:", res.data);
  //           const serverProjects = res.data;
  //           setDataAdded(true);
  //           await clearProjects(); // remove old data
  //           // await project(); // refresh the project list
  //           // await addProject([...projects, serverProjects]);
  //           await syncProjectsFromServer(); // Sync projects from server

  //           // 4. Update state for React UI
  //           // setProjects([...projects, serverProjects]);
  //         } catch (err) {
  //           console.error("❌ Error saving project:", err.response?.data || err.message);
  //         }
  //       }
  //     };
  //     sendAllProjects();
  //   }

  // }, [projects]);

  // Function to create a new project
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
    sendAllProjects, // Function to send all projects to the server
    syncProjectsFromServer, // Function to sync projects from the server
  };
}
