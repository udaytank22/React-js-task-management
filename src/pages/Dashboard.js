import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Dashboard.css";
import { fetchTotalCount } from "../api/Auth";

export default function Dashboard() {
  const [data, setData] = useState({
    pendingTasks: 0,
    inProgressTasks: 0,
    completedTasks: 0,
    targetHours: 0,
    completedHours: 0,
  });

  const recentActivities = [
    {
      id: 1,
      message: 'Task "Homepage Redesign" completed.',
      time: "2 hours ago",
      user: "Alex Johnson",
      icon: "bi-check-circle-fill text-success",
    },
    {
      id: 2,
      message: 'Task "API Integration" status updated to In Progress.',
      time: "5 hours ago",
      user: "Maria Garcia",
      icon: "bi-arrow-repeat text-primary",
    },
    {
      id: 3,
      message: 'New team member "Sarah Miller" added to Project Phoenix.',
      time: "1 day ago",
      user: "Admin",
      icon: "bi-person-plus-fill text-warning",
    },
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchTotalCount();
        setData({
          pendingTasks: res.pending || 0,
          inProgressTasks: res.in_progress || 0,
          completedTasks: res.completed || 0,
          targetHours: res.target_hours || 0,
          completedHours: res.worked_hours || 0,
        });
      } catch (err) {
        console.error("Error loading dashboard data:", err.message);
      }
    };
    loadData();
  }, []);

  const attendanceProgress =
    data.targetHours > 0 ? (data.completedHours / data.targetHours) * 100 : 0;
  const clampedAttendanceProgress = Math.min(attendanceProgress, 100);

  return (
    <div className="mx-5 my-5">
      <h2 className="fw-bold mb-3">Dashboard Overview</h2>
      <p className="text-muted mb-4">
        Welcome back! Here's your progress and attendance.
      </p>

      <div className="row g-4 mb-4">
        <div className="col-lg-4 col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-body d-flex align-items-center">
              <div className="bg-warning-subtle text-warning p-3 rounded me-3">
                <i className="bi bi-hourglass-split fs-3"></i>
              </div>
              <div>
                <h6 className="mb-1 fw-semibold">Pending Tasks</h6>
                <h4>{data.pendingTasks}</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-body d-flex align-items-center">
              <div className="bg-info-subtle text-info p-3 rounded me-3">
                <i className="bi bi-arrow-repeat fs-3"></i>
              </div>
              <div>
                <h6 className="mb-1 fw-semibold">In Progress</h6>
                <h4>{data.inProgressTasks}</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-12">
          <div className="card shadow-sm border-0">
            <div className="card-body d-flex align-items-center">
              <div className="bg-success-subtle text-success p-3 rounded me-3">
                <i className="bi bi-check-circle fs-3"></i>
              </div>
              <div>
                <h6 className="mb-1 fw-semibold">Completed Tasks</h6>
                <h4>{data.completedTasks}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Progress */}
      <div className="row g-4 mb-4">
        <div className="col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="fw-semibold mb-3">Attendance Progress</h6>
              <div className="d-flex justify-content-between mb-1">
                <span>Completed: {data.completedHours} hrs</span>
                <span>Target: {data.targetHours} hrs</span>
              </div>
              <div className="progress" style={{ height: "20px" }}>
                <div
                  className="progress-bar bg-primary"
                  style={{ width: `${clampedAttendanceProgress}%` }}
                >
                  {clampedAttendanceProgress.toFixed(1)}%
                </div>
              </div>
              <small className="text-muted mt-2 d-block">
                {attendanceProgress >= 100
                  ? "Excellent! Target hours achieved."
                  : `You have ${(
                      data.targetHours - data.completedHours
                    ).toFixed(1)} hrs remaining.`}
              </small>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card shadow-sm border-0 text-center">
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <div className="text-primary mb-3">
                <i className="bi bi-graph-up-arrow fs-1"></i>
              </div>
              <h5>Performance Insights</h5>
              <p className="text-muted mb-3">
                Unlock detailed analytics and reports by upgrading to our Pro
                plan.
              </p>
              <button className="btn btn-primary btn-sm">Learn More</button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h6 className="fw-semibold mb-3">Recent Activity</h6>
          <ul className="list-unstyled">
            {recentActivities.map((activity) => (
              <li key={activity.id} className="mb-3 d-flex">
                <div className="me-3">
                  <i className={`bi ${activity.icon} fs-4`}></i>
                </div>
                <div>
                  <div>{activity.message}</div>
                  <small className="text-muted">
                    {activity.time} by {activity.user}
                  </small>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
