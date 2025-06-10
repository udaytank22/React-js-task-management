import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import "./Project.css";
import { fetchProjectList } from "../api/Auth";
import Logo from '../assets/images/logo.png'

function Project() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const res = await fetchProjectList();

        // Modify this mapping based on your actual API response structure
        setProjects(res.data || []);
      } catch (err) {
        console.error("Error loading dashboard data:", err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const [newProject, setNewProject] = useState({
    name: "",
    startDate: "",
    endDate: "",
    description: "",
    status: "ongoing",
  });

  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const calculateDuration = (start, end) => {
    if (!start) return null;
    if (!end) return "Ongoing";

    const startDateObj = new Date(start);
    const endDateObj = new Date(end);
    const diffTime = Math.abs(endDateObj.getTime() - startDateObj.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 30) return `${diffDays} days`;
    const diffMonths = Math.floor(diffDays / 30);
    return diffMonths > 1 ? `${diffMonths} months` : "1 month";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleAddProject = (e) => {
    console.log("Adding project:", newProject);
  };

  const handleDeleteProject = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter((project) => project.id !== id));
    }
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setNewProject({
      name: project.name,
      startDate: project.startDate,
      endDate: project.endDate || "",
      description: project.description || "",
      status: project.status,
    });
    setShowModal(true);
  };

  const handleUpdateProject = (e) => {
    e.preventDefault();
    if (newProject.name && newProject.startDate) {
      setProjects(
        projects.map((project) =>
          project.id === editingProject.id
            ? {
              ...newProject,
              id: editingProject.id,
              endDate: newProject.endDate || null,
              status: newProject.endDate ? "completed" : "ongoing",
            }
            : project
        )
      );
      resetForm();
      setShowModal(false);
    }
  };

  const resetForm = () => {
    setNewProject({
      name: "",
      startDate: "",
      endDate: "",
      description: "",
      status: "ongoing",
    });
    setEditingProject(null);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return "bg-success";
      case "ongoing":
        return "bg-warning text-dark";
      case "planned":
        return "bg-info text-dark";
      default:
        return "bg-secondary";
    }
  };

  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <img
          src={Logo}
          alt="Loading..."
          className="animate__animated animate__flash"
          style={{
            width: "200px",
            height: "200px",
            animationIterationCount: "infinite",
          }}
        />
      </div>
    );
  }

  return (
    <div className="container py-5">
      <header className="text-left mb-5 animate__animated animate__fadeIn">
        <h1 className="display-6 fw-bold text-gradient">
          <i className="bi bi-kanban"></i> Projects
        </h1>
        <p className="lead text-muted">
          All Projects are listed here. You can add, edit, or delete projects
        </p>
      </header>

      {/* Action Bar */}
      <div className="d-flex justify-content-between mb-4 animate__animated animate__fadeIn">
        <div className="search-box">
          <i className="bi bi-search"></i>
          <input
            type="text"
            className="form-control"
            placeholder="Search projects..."
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          <i className="bi bi-plus-lg me-2"></i> New Project
        </button>
      </div>

      {/* Projects List */}
      {projects.length === 0 ? (
        <div
          className="alert alert-info text-center animate__animated animate__fadeIn"
          role="alert"
        >
          <div className="py-4">
            <i className="bi bi-inbox" style={{ fontSize: "3rem" }}></i>
            <h5 className="mt-3">No projects found</h5>
            <p className="mb-0">Add your first project to get started</p>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {projects.map((project) => {
            const duration = calculateDuration(
              project.stff_belongs_to_project.start_date,
              project.stff_belongs_to_project.end_date
            );
            const isOngoing = !project.endDate || project.status === "ongoing";

            return (
              <div
                key={project.id}
                className="col-xxl-3 col-lg-4 col-md-6 animate__animated animate__fadeIn"
              >
                <div className="card h-100 shadow-sm project-card">
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h5 className="card-title mb-0 text-truncate">
                        {project.stff_belongs_to_project.project_name}
                      </h5>
                      <span
                        className={`badge ${getStatusBadge(
                          project.status
                        )} rounded-pill`}
                      >
                        {project.status}
                      </span>
                    </div>

                    <div className="project-meta mb-3">
                      <div className="d-flex align-items-center mb-2">
                        <i className="bi bi-calendar-check me-2 text-primary"></i>
                        <small>
                          <strong>Start:</strong>{" "}
                          {new Date(
                            project.stff_belongs_to_project.start_date
                          ).toLocaleDateString("en-GB")}
                        </small>
                      </div>
                      {project.stff_belongs_to_project.end_date && (
                        <div className="d-flex align-items-center mb-2">
                          <i className="bi bi-calendar-x me-2 text-primary"></i>
                          <small>
                            <strong>End:</strong>{" "}
                            {new Date(
                              project.stff_belongs_to_project.end_date
                            ).toLocaleDateString("en-GB")}
                          </small>
                        </div>
                      )}
                      {duration && (
                        <div className="d-flex align-items-center">
                          <i className="bi bi-stopwatch me-2 text-primary"></i>
                          <small>
                            <strong>Duration:</strong> {duration}
                          </small>
                        </div>
                      )}
                    </div>

                    <div className="mt-auto pt-3 border-top d-flex justify-content-end gap-2">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleEditProject(project)}
                        title="Edit Project"
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteProject(project.id)}
                        title="Delete Project"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal for Add/Edit Project */}
      <div
        className={`modal fade ${showModal ? "show d-block" : ""}`}
        tabIndex="-1"
        style={{
          backgroundColor: showModal ? "rgba(0,0,0,0.5)" : "transparent",
        }}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">
                {editingProject
                  ? `Edit ${editingProject.name}`
                  : "Add New Project"}
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
              ></button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={
                  editingProject ? handleUpdateProject : handleAddProject
                }
                className="row g-3"
              >
                <div className="col-md-6">
                  <label htmlFor="projectName" className="form-label">
                    Project Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="projectName"
                    name="name"
                    value={newProject.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    value={newProject.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="startDate" className="form-label">
                    Start Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="startDate"
                    name="startDate"
                    value={newProject.startDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="endDate" className="form-label">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="endDate"
                    name="endDate"
                    value={newProject.endDate}
                    onChange={handleInputChange}
                    min={newProject.startDate}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="status" className="form-label">
                    Status
                  </label>
                  <select
                    className="form-select"
                    id="status"
                    name="status"
                    value={newProject.status}
                    onChange={handleInputChange}
                  >
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                    <option value="planned">Planned</option>
                  </select>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-success">
                    <i className="bi bi-save me-2"></i>
                    {editingProject ? "Update Project" : "Add Project"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project;
