import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TaskDashboard.css";
import { addTask, updateTaskStatus } from "../redux/taskSlice";
import { useDispatch, useSelector } from "react-redux";

const TaskDashboard = () => {
  const tasks = useSelector((state) => state.tasks);
  const [selectedStatus, setSelectedStatus] = useState("Pending");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const dispatch = useDispatch();

  const [newTask, setNewTask] = useState({
    task_name: "",
    project: "",
    module: "",
    type: "Development",
    status: "Pending",
  });

  useEffect(() => {
    const filtered = tasks.filter((task) => task.status === selectedStatus);
    setFilteredTasks(filtered);
  }, [selectedStatus, tasks]);

  const handleViewTask = (task) => {
    setSelectedTask(task);
    setShowTaskModal(true);
  };

  const handleCloseTaskModal = () => {
    setSelectedTask(null);
    setShowTaskModal(false);
  };
  const handleAddTask = () => {
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

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="mb-4 d-flex gap-2">
          {["Pending", "Working", "Completed"].map((status) => (
            <button
              key={status}
              className={`filter-button ${selectedStatus === status ? "active" : ""
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

      <div className="task-table-container p-3 rounded shadow-sm bg-white">
        <table className="table table-borderless align-middle mb-0">
          <thead>
            <tr className="table-header">
              <th>Task Name</th>
              <th>Project</th>
              <th>Module</th>
              <th>Type</th>
              <th className="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.id} className="task-row">
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
            {filteredTasks.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          {selectedTask?.status === "Pending" && (
            <>
              <Button
                variant="primary"
                onClick={() => {
                  handleStatusChange("Working")
                  handleCloseTaskModal()
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
                  handleStatusChange("Pending")
                  handleCloseTaskModal()
                }}
              >
                Stop
              </Button>
              <Button
                variant="success"
                onClick={() => {
                  handleStatusChange("Complete")
                  handleCloseTaskModal()
                }}
              >
                Complete
              </Button>
              <Button variant="secondary" onClick={handleCloseTaskModal}>
                Close
              </Button>
            </>
          )}

          {selectedTask?.status === "Finished" && <>{/* No buttons */}</>}
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
