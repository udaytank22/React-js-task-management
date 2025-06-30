// src/components/Dashboard.js
import { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../assets/styles/Dashboard.css"; // Ensure this path is correct
import { fetchTotalCount } from "../api/Auth"; // Assuming this API returns monthly counts
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { updateTaskStatus } from "../redux/taskSlice";

gsap.registerPlugin(useGSAP);

// FadeIn component for animation
const FadeIn = ({ children, stagger = 0, y = 0, ref, className = "" }) => {
  const el = useRef();
  const animation = useRef();

  useGSAP(
    () => {
      animation.current = gsap.from(el.current.children, {
        opacity: 0,
        stagger,
        y,
        ease: "power3.out", // Added ease for smoother animation
      });
    },
    { scope: el }
  ); // Added scope for GSAP context

  useGSAP(() => {
    // forward the animation instance
    if (typeof ref === "function") {
      ref(animation.current);
    } else if (ref) {
      ref.current = animation.current;
    }
  }, [ref]);

  return (
    <div ref={el} className={`row g-4 mb-4 ${className}`}>
      {children}
    </div>
  );
};

export default function Dashboard() {
  const animationRef = useRef();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    pendingTasks: 0,
    inProgressTasks: 0,
    completedTasks: 0,
    targetHours: 0,
    completedHours: 0,
  });
  const [runningTasks, setRunningTasks] = useState([]);

  const tasks = useSelector((state) => state.tasks);
  const selectedStatus = "Working"; // Assuming this is the status you want to filter by
  useEffect(() => {
    setData({
      pendingTasks: tasks.filter((task) => task.status === "Pending").length,
      inProgressTasks: tasks.filter((task) => task.status === "Working").length,
      completedTasks: tasks.filter((task) => task.status === "Completed")
        .length,
    });
    const filtered = tasks.filter((task) => task.status === selectedStatus);
    setRunningTasks(filtered);
  }, [selectedStatus, tasks]);

  const handleStatusChange = (newStatus, selectedTaskId) => {
    console.log("Changing status to:", newStatus);
    console.log("Selected Task ID:", selectedTaskId);
    if (runningTasks) {
      dispatch(updateTaskStatus({ id: selectedTaskId, status: newStatus }));
      setRunningTasks({ ...runningTasks, status: newStatus });
    }
  };

  return (
    <div className="mx-5 my-5">
      <h2 className="fw-bold mb-3">Dashboard Overview</h2>
      <p className="text-muted mb-4">Welcome back! Here's your progress.</p>

      {/* TOP SECTION: Monthly Pending, In Progress, Completed Counts */}
      <FadeIn stagger={0.1} y={-50} ref={animationRef}>
        <div className="col-lg-4 col-md-6">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body d-flex align-items-center">
              <div className="bg-warning-subtle text-warning p-3 rounded-3 me-3">
                <i className="bi bi-hourglass-split fs-3"></i>
              </div>
              <div>
                <h6 className="mb-1 fw-semibold">Pending Tasks</h6>
                <h4 className="display-6 fw-bold mb-0">{data.pendingTasks}</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body d-flex align-items-center">
              <div className="bg-info-subtle text-info p-3 rounded-3 me-3">
                <i className="bi bi-arrow-repeat fs-3"></i>
              </div>
              <div>
                <h6 className="mb-1 fw-semibold">In Progress Tasks</h6>
                <h4 className="display-6 fw-bold mb-0">
                  {data.inProgressTasks}
                </h4>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-12">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body d-flex align-items-center">
              <div className="bg-success-subtle text-success p-3 rounded-3 me-3">
                <i className="bi bi-check-circle fs-3"></i>
              </div>
              <div>
                <h6 className="mb-1 fw-semibold">Completed Tasks</h6>
                <h4 className="display-6 fw-bold mb-0">
                  {data.completedTasks}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* BOTTOM SECTION: Running Tasks & Calendar */}
      <FadeIn stagger={0.1} y={1000} ref={animationRef}>
        <div className="card shadow-sm border-0 rounded-4 h-100">
          <div className="card-body">
            <h5 className="fw-semibold mb-3">Running Tasks</h5>
            {runningTasks.length > 0 ? (
              <ul className="list-group list-group-flush">
                {runningTasks.map((task) => (
                  <li
                    key={task.id}
                    className="list-group-item d-flex justify-content-between align-items-center py-2 px-0"
                  >
                    <div>
                      <h6 className="mb-0">{task.task_name}</h6>
                      <small className="text-muted">
                        Module: {task.module} | Type: {task.type}
                      </small>
                    </div>
                    <div>
                      <div className="d-flex gap-2">
                        <span
                          className={`badge rounded-pill bg-${
                            task.status === "In Progress"
                              ? "info"
                              : task.status === "Pending"
                              ? "warning"
                              : "secondary"
                          } text-uppercase`}
                        >
                          {task.status}
                        </span>
                      </div>
                      <div className="mt-2 d-flex gap-2">
                        <Button
                          variant="danger"
                          onClick={() => {
                            console.log("Stopping task:", task.id);
                            handleStatusChange("Pending", task.id);
                          }}
                        >
                          Stop
                        </Button>
                        <Button
                          variant="success"
                          onClick={() => {
                            console.log("Completing task:", task.id);
                            handleStatusChange("Completed", task.id);
                          }}
                        >
                          Completed
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center text-muted py-5">
                <i className="bi bi-check-circle fs-3 d-block mb-2"></i>
                No tasks currently in progress.
              </div>
            )}
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
