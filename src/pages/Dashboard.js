import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // Ensure you have bootstrap-icons imported
import "./Dashboard.css"; // We'll create this for custom styles
import { fetchTotalCount } from "../api/Auth"; // Assuming fetchPerformanceReport is not directly used here

export default function Dashboard() {
  const [data, setData] = useState({
    pendingTasks: 0,
    inProgressTasks: 0,
    completedTasks: 0,
    targetHours: 0, // Ensure these are numeric, or handle NaN
    completedHours: 0, // Ensure these are numeric, or handle NaN
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchTotalCount(); // Assuming this returns an object like { pending, in_progress, completed, target_hours, worked_hours }

        setData({
          pendingTasks: res.pending || 0,
          inProgressTasks: res.in_progress || 0,
          completedTasks: res.completed || 0,
          targetHours: res.target_hours || 0,
          completedHours: res.worked_hours || 0,
        });
      } catch (err) {
        console.error("Error loading dashboard data:", err.message);
        // Optionally, set default data or show an error message in UI
        setData({
          pendingTasks: 0,
          inProgressTasks: 0,
          completedTasks: 0,
          targetHours: 0,
          completedHours: 0,
        });
      }
    };

    loadData();
  }, []);

  // Calculate progress percentage
  const attendanceProgress =
    data.targetHours > 0 ? (data.completedHours / data.targetHours) * 100 : 0;
  // Ensure progress doesn't exceed 100% visually
  const clampedAttendanceProgress = Math.min(attendanceProgress, 100);

  return (
    <div className="container py-5 dashboard-container">
      <header className="text-left mb-5 animate__animated animate__fadeIn">
        <h2 className="display-7 fw-bold text-gradient">
          Dashboard Overview
        </h2>
        <p className="lead text-muted">
          A quick glance at your task progress and attendance summary.
        </p>
      </header>

      {/* Task Summary Cards */}
      <div className="row g-4 mb-5">
        {" "}
        {/* Increased gutter and bottom margin */}
        {/* Pending Tasks */}
        <div className="col-lg-4 col-md-6">
          <div className="card h-100 task-card pending-card shadow-sm border-start border-warning border-4 rounded-3">
            <div className="card-body d-flex align-items-center">
              <div className="icon-wrapper bg-warning-subtle text-warning me-4">
                <i className="bi bi-hourglass-split fs-3"></i>
              </div>
              <div>
                <h5 className="card-title text-warning fw-semibold mb-1">
                  Pending Tasks
                </h5>
                <p className="card-text fs-4 fw-bold mb-0">
                  {data.pendingTasks}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* In Progress Tasks */}
        <div className="col-lg-4 col-md-6">
          <div className="card h-100 task-card inprogress-card shadow-sm border-start border-info border-4 rounded-3">
            <div className="card-body d-flex align-items-center">
              <div className="icon-wrapper bg-info-subtle text-info me-4">
                <i className="bi bi-arrow-repeat fs-3"></i>
              </div>
              <div>
                <h5 className="card-title text-info fw-semibold mb-1">
                  In Progress
                </h5>
                <p className="card-text fs-4 fw-bold mb-0">
                  {data.inProgressTasks}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Completed Tasks */}
        <div className="col-lg-4 col-md-12">
          {" "}
          {/* Takes full width on MD, to prevent odd wrapping */}
          <div className="card h-100 task-card completed-card shadow-sm border-start border-success border-4 rounded-3">
            <div className="card-body d-flex align-items-center">
              <div className="icon-wrapper bg-success-subtle text-success me-4">
                <i className="bi bi-check-circle fs-3"></i>
              </div>
              <div>
                <h5 className="card-title text-success fw-semibold mb-1">
                  Completed Tasks
                </h5>
                <p className="card-text fs-4 fw-bold mb-0">
                  {data.completedTasks}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Progress Section */}
      <div className="row g-4">
        {" "}
        {/* Consistent gutter */}
        {/* Target vs Completed Hours */}
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm h-100 attendance-card">
            <div className="card-body">
              <h5 className="card-title mb-4 fw-semibold">
                Attendance Progress
              </h5>
              <div className="d-flex justify-content-between mb-2">
                <p className="mb-0 text-muted">
                  Completed: <strong>{data.completedHours} hrs</strong>
                </p>
                <p className="mb-0 text-muted">
                  Target: <strong>{data.targetHours} hrs</strong>
                </p>
              </div>
              <div
                className="progress attendance-progress"
                style={{ height: "25px" }}
              >
                <div
                  className="progress-bar bg-primary"
                  role="progressbar"
                  style={{ width: `${clampedAttendanceProgress}%` }}
                  aria-valuenow={data.completedHours}
                  aria-valuemin="0"
                  aria-valuemax={data.targetHours}
                >
                  {clampedAttendanceProgress.toFixed(1)}%{" "}
                  {/* Display percentage with one decimal */}
                </div>
              </div>
              {attendanceProgress >= 100 && (
                <p className="text-success small mt-2 mb-0">
                  Excellent! Target hours achieved.
                </p>
              )}
              {attendanceProgress < 100 && attendanceProgress > 0 && (
                <p className="text-info small mt-2 mb-0">
                  Keep up the good work! You're{" "}
                  {(data.targetHours - data.completedHours || 0).toFixed(1)}{" "}
                  hours away from your target.
                </p>
              )}
              {attendanceProgress === 0 && (
                <p className="text-muted small mt-2 mb-0">
                  No hours logged yet for this period.
                </p>
              )}
            </div>
          </div>
        </div>
        {/* Placeholder for another chart/card */}
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm h-100 placeholder-card">
            <div className="card-body d-flex flex-column justify-content-center align-items-center text-muted">
              <i className="bi bi-graph-up-arrow fs-1 mb-3"></i>
              <h5 className="card-title">Future Insights</h5>
              <p className="card-text text-center">
                More detailed performance metrics coming soon!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
