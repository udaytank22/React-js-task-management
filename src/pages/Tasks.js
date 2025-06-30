import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/styles/TaskDashboard.css";
import { addTask, updateTaskStatus } from "../redux/taskSlice";
import { useDispatch, useSelector } from "react-redux";

const TaskDashboard = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const [selectedStatus, setSelectedStatus] = useState("Pending");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;

  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newTask, setNewTask] = useState({
    task_name: "",
    project: "",
    module: "",
    type: "Development",
    status: "Pending",
  });

  useEffect(() => {
    initGoogleClient();
  }, []);

  useEffect(() => {
    const filtered = tasks.filter(
      (task) =>
        task.status === selectedStatus &&
        task.task_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTasks(filtered);
    setCurrentPage(1);
  }, [selectedStatus, tasks, searchTerm]);

  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleViewTask = (task) => {
    setSelectedTask(task);
    setShowTaskModal(true);
  };

  const handleCloseTaskModal = () => {
    setSelectedTask(null);
    setShowTaskModal(false);
  };

  const handleAddTask = async () => {
    const newTaskEntry = { ...newTask, id: Date.now() };
    dispatch(addTask(newTaskEntry));
    setShowAddModal(false);
    setNewTask({
      task_name: "",
      project: "",
      module: "",
      type: "Development",
      status: "Pending",
    });

    // try {
    //   const token = await signInWithGoogle();
    //   await createGoogleCalendarEvent(token, newTaskEntry);
    //   alert("Task also added to Google Calendar");
    // } catch (err) {
    //   console.error("Calendar error:", err);
    //   alert("Task added locally, but failed to sync with Google Calendar");
    // }
  };

  const handleStatusChange = (newStatus) => {
    if (selectedTask) {
      dispatch(updateTaskStatus({ id: selectedTask.id, status: newStatus }));
      setSelectedTask({ ...selectedTask, status: newStatus });
    }
  };

  return (
    <div className="mx-5 my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Task Management Dashboard</h2>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex gap-2">
          {["Pending", "Working", "Completed"].map((status) => (
            <button
              key={status}
              className={`filter-button ${
                selectedStatus === status ? "active" : ""
              }`}
              onClick={() => setSelectedStatus(status)}
            >
              {status}
            </button>
          ))}
        </div>
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          <i className="bi bi-plus-circle me-2"></i>Add Task
        </Button>
      </div>

      <Form.Control
        type="text"
        placeholder="Search by task name..."
        className="mb-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle table-striped">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Task Name</th>
              <th>Project</th>
              <th>Module</th>
              <th>Type</th>
              <th className="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTasks.map((task, index) => (
              <tr key={task.id} className="task-row">
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>{task.task_name}</td>
                <td>{task.project}</td>
                <td>{task.module}</td>
                <td>{task.type}</td>
                <td className="text-end">
                  <button
                    className="view-link"
                    onClick={() => handleViewTask(task)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
            {paginatedTasks.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between align-items-center my-3">
        <span>
          Showing {paginatedTasks.length} of {filteredTasks.length} tasks
        </span>
        <div className="d-flex gap-2 align-items-center">
          <Button
            variant="outline-secondary"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </Button>
          <span>Page {currentPage}</span>
          <Button
            variant="outline-secondary"
            size="sm"
            disabled={currentPage * itemsPerPage >= filteredTasks.length}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </div>

      {/* View Task Modal */}
      <Modal show={showTaskModal} onHide={handleCloseTaskModal}>
        <Modal.Header closeButton>
          <Modal.Title>Task Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTask && (
            <>
              <p>
                <strong>Task Name:</strong> {selectedTask.task_name}
              </p>
              <p>
                <strong>Project:</strong> {selectedTask.project}
              </p>
              <p>
                <strong>Module:</strong> {selectedTask.module}
              </p>
              <p>
                <strong>Type:</strong> {selectedTask.type}
              </p>
              <p>
                <strong>Status:</strong> {selectedTask.status}
              </p>
              <p>
                <strong>Start Time:</strong> {selectedTask.start_time || "---"}
              </p>
              <p>
                <strong>End Time:</strong> {selectedTask.end_time || "---"}
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          {selectedTask?.status === "Pending" && (
            <>
              <Button
                variant="primary"
                onClick={() => {
                  handleStatusChange("Working");
                  handleCloseTaskModal();
                }}
              >
                Start
              </Button>
              <Button variant="secondary" onClick={handleCloseTaskModal}>
                Close
              </Button>
            </>
          )}
          {selectedTask?.status === "Working" && (
            <>
              <Button
                variant="danger"
                onClick={() => {
                  handleStatusChange("Pending");
                  handleCloseTaskModal();
                }}
              >
                Stop
              </Button>
              <Button
                variant="success"
                onClick={() => {
                  handleStatusChange("Completed");
                  handleCloseTaskModal();
                }}
              >
                Completed
              </Button>
              <Button variant="secondary" onClick={handleCloseTaskModal}>
                Close
              </Button>
            </>
          )}
          {selectedTask?.status === "Completed" && (
            <Button variant="secondary" onClick={handleCloseTaskModal}>
              Close
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {/* Add Task Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                value={newTask.task_name}
                onChange={(e) =>
                  setNewTask({ ...newTask, task_name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Project</Form.Label>
              <Form.Control
                type="text"
                value={newTask.project}
                onChange={(e) =>
                  setNewTask({ ...newTask, project: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Module</Form.Label>
              <Form.Control
                type="text"
                value={newTask.module}
                onChange={(e) =>
                  setNewTask({ ...newTask, module: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select
                value={newTask.type}
                onChange={(e) =>
                  setNewTask({ ...newTask, type: e.target.value })
                }
              >
                <option>Development</option>
                <option>Bug Fix</option>
                <option>Integration</option>
                <option>Design</option>
                <option>Testing</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={newTask.status}
                onChange={(e) =>
                  setNewTask({ ...newTask, status: e.target.value })
                }
              >
                <option>Pending</option>
                <option>Working</option>
                <option>Completed</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddTask}>
            Save Task
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TaskDashboard;
