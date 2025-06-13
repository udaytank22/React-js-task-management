import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("Attendance");

  const presentDays = 20;
  const absentDays = 2;
  const totalLeaves = 15;
  const usedLeaves = 5;
  const remainingLeaves = totalLeaves - usedLeaves;

  const leaveHistory = [
    {
      date: "2024-07-15 to 2024-07-17",
      type: "Vacation",
      reason: "Family trip",
      status: "Approved",
    },
    {
      date: "2024-06-20",
      type: "Sick Leave",
      reason: "Flu",
      status: "Approved",
    },
    {
      date: "2024-05-10",
      type: "Personal Leave",
      reason: "Appointment",
      status: "Rejected",
    },
  ];

  const weeklyAttendance = [
    {
      date: "2025-06-10",
      day: "Monday",
      punchIn: "09:10 AM",
      punchOut: "06:05 PM",
      status: "Full Day",
    },
    {
      date: "2025-06-11",
      day: "Tuesday",
      punchIn: "10:15 AM",
      punchOut: "02:30 PM",
      status: "Half Day",
    },
    {
      date: "2025-06-12",
      day: "Wednesday",
      punchIn: "09:00 AM",
      punchOut: "06:00 PM",
      status: "Full Day",
    },
    {
      date: "2025-06-13",
      day: "Thursday",
      punchIn: "Absent",
      punchOut: "-",
      status: "Absent",
    },
    {
      date: "2025-06-14",
      day: "Friday",
      punchIn: "08:55 AM",
      punchOut: "05:45 PM",
      status: "Full Day",
    },
  ];

  const attendanceChart = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        data: [presentDays, absentDays],
        backgroundColor: ["#4CAF50", "#F44336"],
        hoverOffset: 4,
      },
    ],
  };

  const leaveChart = {
    labels: ["Used", "Remaining"],
    datasets: [
      {
        data: [usedLeaves, remainingLeaves],
        backgroundColor: ["#2196F3", "#FFC107"],
        hoverOffset: 4,
      },
    ],
  };

  const renderAttendance = () => (
    <>
      <h6 className="mt-4">Attendance Tracker</h6>
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="border rounded p-3 text-center">
            <h5>{presentDays}</h5>
            <p className="mb-0 text-muted">Present Days</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="border rounded p-3 text-center">
            <h5>{absentDays}</h5>
            <p className="mb-0 text-muted">Absent Days</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="border rounded p-3 text-center">
            <h5>{presentDays + absentDays}</h5>
            <p className="mb-0 text-muted">Total Working Days</p>
          </div>
        </div>
      </div>

      <h6 className="mt-4">Latest Week's Attendance</h6>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Date</th>
              <th>Day</th>
              <th>Punch In</th>
              <th>Punch Out</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {weeklyAttendance.map((entry, index) => (
              <tr key={index}>
                <td>{entry.date}</td>
                <td>{entry.day}</td>
                <td>{entry.punchIn}</td>
                <td>{entry.punchOut}</td>
                <td>
                  <span
                    className={`badge ${entry.status === "Full Day"
                      ? "bg-success"
                      : entry.status === "Half Day"
                        ? "bg-warning text-dark"
                        : "bg-danger"
                      }`}
                  >
                    {entry.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  const renderLeaveManagement = () => (
    <>
      <h6>Leave Management</h6>
      <div className="row mb-3">
        <div className="col-md-4">
          <div className="border rounded p-3 text-center">
            <h5>{totalLeaves}</h5>
            <p className="mb-0 text-muted">Total Leaves</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="border rounded p-3 text-center">
            <h5>{usedLeaves}</h5>
            <p className="mb-0 text-muted">Used Leaves</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="border rounded p-3 text-center">
            <h5>{remainingLeaves}</h5>
            <p className="mb-0 text-muted">Remaining Leaves</p>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <button className="btn btn-primary">Apply for Leave</button>
      </div>

      <h6>Leave Application History</h6>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveHistory.map((leave, index) => (
              <tr key={index}>
                <td>{leave.date}</td>
                <td>{leave.type}</td>
                <td>{leave.reason}</td>
                <td>
                  <span
                    className={`badge ${leave.status === "Approved"
                      ? "bg-success"
                      : leave.status === "Rejected"
                        ? "bg-danger"
                        : "bg-secondary"
                      }`}
                  >
                    {leave.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  const renderPerformance = () => (
    <>
      <h6>Performance Overview</h6>
      <div className="row mb-5">
        <div className="col-md-6 text-center">
          <h6>Attendance Distribution</h6>
          <Pie data={attendanceChart} />
        </div>
        <div className="col-md-6 text-center">
          <h6>Leave Usage</h6>
          <Pie data={leaveChart} />
        </div>
      </div>
    </>
  );

  return (
    <div className="container my-5">
      {/* Profile Header */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center gap-3">
          <img
            src="https://via.placeholder.com/80"
            alt="Profile"
            className="rounded-circle"
            width="80"
            height="80"
          />
          <div>
            <h5 className="mb-0">Emily Carter</h5>
            <small className="text-muted">Employee ID: 12345 | Marketing Department</small>
          </div>
        </div>
        <button className="btn btn-outline-secondary">Edit Profile</button>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        {["Attendance", "Leave Management", "Performance"].map((tab) => (
          <li className="nav-item" key={tab}>
            <button
              className={`nav-link ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>

      {/* Tab Content */}
      {activeTab === "Attendance" && renderAttendance()}
      {activeTab === "Leave Management" && renderLeaveManagement()}
      {activeTab === "Performance" && renderPerformance()}
    </div>
  );
};

export default ProfilePage;
