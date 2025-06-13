import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./Project.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addModule,
  addProject,
  deleteProject,
  updateProject,
} from "../redux/taskSlice";

export default function Project() {
  const dispatch = useDispatch();

  const modules = useSelector((state) => state.modules ?? []);
  const projects = useSelector((state) => state.projects ?? []);
  console.log("projects", projects);
  const [search, setSearch] = useState("");

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedProject, setSelectedProject] = useState(null);
  const [formData, setFormData] = useState({
    project_name: "",
    description: "",
    start_date: "",
    end_date: "",
    status: "",
  });

  const [showModuleModal, setShowModuleModal] = useState(false);
  const [showAddModuleModal, setShowAddModuleModal] = useState(false);
  const [currentModuleProject, setCurrentModuleProject] = useState(null);
  const [moduleFormData, setModuleFormData] = useState({
    module_name: "",
    description: "",
  });

  const handleSaveModule = () => {
    dispatch(
      addModule({
        id: Date.now(),
        module_name: moduleFormData.module_name,
        description: moduleFormData.description,
      })
    );
    setShowAddModuleModal(false);
    setShowModuleModal(true);
  };

  const calculateDuration = (start, end) => {
    if (!start) return null;
    if (!end) return "Ongoing";
    const startDateObj = new Date(start);
    const endDateObj = new Date(end);
    const diffTime = Math.abs(endDateObj - startDateObj);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days`;
  };

  const openProjectModal = (mode, project = null) => {
    setModalMode(mode);
    setSelectedProject(project);
    if (project) {
      setFormData({
        project_name: project.project_name || "",
        description: project.description || "",
        start_date: project.start_date?.slice(0, 10) || "",
        end_date: project.end_date?.slice(0, 10) || "",
        status: project.status || "",
      });
    } else {
      setFormData({
        project_name: "",
        description: "",
        start_date: "",
        end_date: "",
        status: "",
      });
    }
    setShowProjectModal(true);
  };

  const handleProjectInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleModuleInputChange = (e) => {
    const { name, value } = e.target;
    setModuleFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProject = () => {
    if (modalMode === "add") {
      dispatch(
        addProject({
          id: Date.now(),
          ...formData,
        })
      );
    } else {
      dispatch(
        updateProject({
          id: selectedProject.id,
          ...formData,
        })
      );
    }
    setShowProjectModal(false);
  };

  const handleDeleteProject = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      dispatch(deleteProject(id));
    }
  };

  const filteredProjects = projects.filter((project) => {
    const projectName = project?.project_name || "";
    return projectName.toLowerCase().includes(search.toLowerCase());
  });

  console.log("filteredProjects", filteredProjects);

  return (
    <div className="mx-5 my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Projects</h2>
          <p className="text-muted">
            All Projects are listed here. You can add, edit, or delete projects.
          </p>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="mb-4 position-relative">
          <input
            type="text"
            className="form-control ps-5"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <i
            className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
            style={{ fontSize: "1rem" }}
          ></i>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => openProjectModal("add")}
        >
          <i className="bi bi-plus-circle me-2"></i> Add Project
        </button>
      </div>

      <div className="row g-4">
        {filteredProjects.map((project) => {
          const startDate = new Date(project.start_date).toLocaleDateString(
            "en-GB"
          );
          const endDate = project.end_date
            ? new Date(project.end_date).toLocaleDateString("en-GB")
            : null;
          const duration = calculateDuration(
            project.start_date,
            project.end_date
          );

          return (
            <div key={project.id} className="col-lg-3 col-md-4 col-sm-6">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body">
                  <h5 className="mb-3">{project.project_name}</h5>
                  <ul className="list-unstyled small">
                    <li className="mb-2">
                      <i className="bi bi-calendar-event text-primary me-2"></i>
                      <strong>Start:</strong> {startDate}
                    </li>
                    {endDate && (
                      <li className="mb-2">
                        <i className="bi bi-calendar-x text-danger me-2"></i>
                        <strong>End:</strong> {endDate}
                      </li>
                    )}
                    <li>
                      <i className="bi bi-hourglass-split text-success me-2"></i>
                      <strong>Duration:</strong> {duration}
                    </li>
                  </ul>
                </div>

                <div className="card-footer bg-white border-0 d-flex justify-content-end align-items-center gap-2">
                  <button
                    className="btn btn-sm"
                    onClick={() => openProjectModal("edit", project)}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-sm"
                    onClick={() => handleDeleteProject(project.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                  <button
                    className="btn btn-sm"
                    onClick={() => {
                      setCurrentModuleProject(project);
                      setShowModuleModal(true);
                    }}
                  >
                    <i className="bi bi-list-ul"></i>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Project Modal */}
      <Modal show={showProjectModal} onHide={() => setShowProjectModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalMode === "add" ? "Add Project" : "Edit Project"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">Project Name</label>
            <input
              type="text"
              className="form-control"
              name="project_name"
              value={formData.project_name}
              onChange={handleProjectInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleProjectInputChange}
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Start Date</label>
            <input
              type="date"
              className="form-control"
              name="start_date"
              value={formData.start_date}
              onChange={handleProjectInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">End Date</label>
            <input
              type="date"
              className="form-control"
              name="end_date"
              value={formData.end_date}
              onChange={handleProjectInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              className="form-control"
              name="status"
              value={formData.status}
              onChange={handleProjectInputChange}
            >
              <option value="">Select Status</option>
              <option value="Planning">Planning</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowProjectModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveProject}>
            Save Project
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Module Modal */}
      <Modal show={showModuleModal} onHide={() => setShowModuleModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Modules for {currentModuleProject?.project_name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modules.length === 0 ? (
            <p className="text-muted">No modules found for this project.</p>
          ) : (
            <ul className="list-group">
              {modules.map((module) => (
                <li key={module.id} className="list-group-item">
                  <strong>{module.module_name}</strong>
                  <p className="mb-0">{module.description}</p>
                </li>
              ))}
            </ul>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              setShowAddModuleModal(true);
              setShowModuleModal(false);
            }}
          >
            Add Module
          </Button>
          <Button variant="secondary" onClick={() => setShowModuleModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Module Modal */}
      <Modal
        show={showAddModuleModal}
        onHide={() => setShowAddModuleModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Module</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">Module Name</label>
            <input
              type="text"
              className="form-control"
              name="module_name"
              value={moduleFormData.module_name}
              onChange={handleModuleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              value={moduleFormData.description}
              onChange={handleModuleInputChange}
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowAddModuleModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveModule}>
            Save Module
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
