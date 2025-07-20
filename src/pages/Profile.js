import React, { useRef, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { FadeIn, FadeInBottom, FadeInWords } from "../component/Animations";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { addAttendance, addLeave, updateData } from "../redux/taskSlice";
import moment from "moment";

ChartJS.register(ArcElement, Tooltip, Legend);

const ProfilePage = () => {
  const animationRef = useRef();
  const [activeTab, setActiveTab] = useState("Attendance");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Single Day");
  const [entryType, setEntryType] = useState("");

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const dispatch = useDispatch();

  const weeklyAttendance = useSelector((state) => state.attendance ?? []);
  const userProfile = useSelector((state) => state.profile ?? []);
  const leaveHistory = useSelector((state) => state.leave ?? []);

  const [attadence, setattadence] = useState({
    date: moment().format("YYYY-MM-DD"),
    punchIn: weeklyAttendance.punchIn || moment().format("hh:mm"), // assuming this can be empty or null
    day: moment().format("dddd"),
    punchOut:
      weeklyAttendance.punchIn && weeklyAttendance.punchIn.trim() !== ""
        ? moment().format("HH:mm") // or use weeklyAttendance.punchOut if you have it
        : "",
  });

  const [leave, setLeave] = useState({
    date: "",
    reason: "",
    firstDate: "",
    endDate: "",
    status: "Pending",
  });

  const [profileData, setProfileData] = useState({
    name: userProfile.name,
    dob: userProfile.dob,
    mobile: userProfile.mobile,
    address: userProfile.address
  })

  const handleProjectInputChange = (e) => {
    const { name, value } = e.target;

    if (entryType === "Attendance") {
      setattadence((prev) => {
        let updatedData = { ...prev, [name]: value };
        if (name === "punchIn") {
          if (value && value.trim() !== "") {
            // Set punchOut to current time (or keep previous punchOut if you want)
            updatedData.punchOut = moment().format("HH:mm");
          } else {
            updatedData.punchOut = ""; // clear punchOut if punchIn is blank
          }
        }

        if (name === "date") {
          updatedData.day = moment(value).format("dddd");
        }

        return updatedData;
      });
    } else if (entryType === "Leave") {
      setLeave((prev) => {
        let updatedData = { ...prev, [name]: value };
        if (name === "endDate" || name === "firstDate") {
          const start =
            name === "firstDate"
              ? value
              : moment(updatedData.firstDate).format('DD-MM-YYYY') || prev.firstDate;
          const end =
            name === "endDate" ? value : updatedData.endDate || prev.endDate;

          updatedData.date = end ? `${start} to ${end}` : start;
        }

        if (name === "Leave Type") {
          console.log("Leave type selected:", value);
          updatedData.type = value;
        }

        return updatedData;
      });
    } else if (activeTab === "Profile Data") {
      setProfileData((prev) => {
        let updatedData = { ...prev, [name]: value };
        console.log('updatedData', updatedData)
        return updatedData;
      });
    }
  };

  const presentDays = weeklyAttendance.filter(
    (entry) => entry.status === "Full Day"
  ).length;
  const halfDays = weeklyAttendance.filter(
    (entry) => entry.status === "Half Day"
  ).length;
  const absentDays = weeklyAttendance.filter(
    (entry) => entry.status === "Absent"
  ).length;

  const usedLeaves = leaveHistory.filter(
    (entry) => entry.status === "Pending"
  ).length;
  const approvedLeave = leaveHistory.filter(
    (entry) => entry.status === "Approved"
  ).length;
  const rejectedLeave = leaveHistory.filter(
    (entry) => entry.status === "Rejected"
  ).length;
  const remainingLeaves = approvedLeave - usedLeaves;

  const handleAddTask = () => {
    if (entryType === "Attendance") {
      const today = moment(attadence.date).format("YYYY-MM-DD");

      const existingEntry = weeklyAttendance.find(
        (entry) => entry.date === today
      );

      let newTaskEntry;

      if (existingEntry && !existingEntry.punchOut) {
        // Second punch (punchOut)
        const punchInTime = moment(existingEntry.punchIn, "HH:mm");
        const punchOutTime = moment(attadence.punchIn, "HH:mm"); // current time as punchOut

        const hoursWorked = punchOutTime.diff(punchInTime, "hours", true);

        const status =
          hoursWorked >= 8
            ? "Full Day"
            : hoursWorked >= 4
              ? "Half Day"
              : "Half Day";

        newTaskEntry = {
          ...existingEntry,
          punchOut: attadence.punchIn,
          status,
        };
      } else {
        // First punch (punchIn)
        newTaskEntry = {
          id: Date.now(),
          date: attadence.date,
          day: attadence.day,
          punchIn: attadence.punchIn,
          punchOut: "",
          status: "Punch in",
        };
      }

      dispatch(addAttendance(newTaskEntry));
      setShowAddModal(false);
    } else if (entryType === "Leave") {
      dispatch(addLeave(leave));
      setShowAddModal(false);
      setLeave({
        date: "",
        reason: "",
        status: "Pending",
      });
    } else if (activeTab === "Profile Data") {
      dispatch(updateData(profileData));
      setShowAddModal(false);
    }
  };

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
    <FadeInBottom stagger={0.1} y={1000} ref={animationRef}>
      <h6 className="mb-3">Attendance Tracker</h6>
      <div className="row text-center mb-4">
        <div className="col-md-3">
          <div className="border rounded p-3 bg-light">
            <h4 className="text-primary">{presentDays}</h4>
            <p className="text-muted mb-0">Present Days</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="border rounded p-3 bg-light">
            <h4 className="text-primary">{halfDays}</h4>
            <p className="text-muted mb-0">Half Days</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="border rounded p-3 bg-light">
            <h4 className="text-warning">{absentDays}</h4>
            <p className="text-muted mb-0">Absent Days</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="border rounded p-3 bg-light">
            <h4>{presentDays + halfDays + absentDays}</h4>
            <p className="text-muted mb-0">Total Working Days</p>
          </div>
        </div>
      </div>

      <h6 className="mb-3">Latest Week's Attendance</h6>
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
                <td>{moment(entry.date).format("DD-MMM-yyyy")}</td>
                <td>{entry.day}</td>
                <td>
                  {entry.punchIn !== "Absent"
                    ? moment(entry.punchIn, "HH:mm").format("hh:mm A")
                    : "Absent"}
                </td>
                <td>
                  {entry.punchOut === ""
                    ? "-"
                    : entry.punchOut === "-"
                      ? "Absent"
                      : moment(entry.punchOut, "HH:mm").format("hh:mm A")}
                </td>
                <td>
                  <span
                    className={`badge ${entry.status === "Full Day"
                      ? "bg-success rounded-pill"
                      : entry.status === "Half Day"
                        ? "bg-warning text-dark rounded-pill"
                        : "bg-danger rounded-pill"
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
    </FadeInBottom>
  );

  const renderProfileData = () => (
    <FadeInBottom stagger={0.1} y={1000} ref={animationRef}>
      {/* User Profile Section */}
      <div className="card mb-4 p-3 shadow-sm">
        <div className="d-flex align-items-center mb-3">
          {userProfile.profileImage && (
            <img
              src={userProfile.profileImage}
              alt="Profile"
              className="rounded-circle me-4"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
          )}
          <div>
            <h4 className="mb-1">{userProfile.name}</h4>
            <p className="text-muted mb-0">{userProfile.designation}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-2">
            <strong>Employee ID:</strong>{" "}
            <span className="text-muted">{userProfile.employeeId}</span>
          </div>
          <div className="col-md-6 mb-2">
            <strong>Mobile:</strong>{" "}
            <span className="text-muted">{userProfile.mobile}</span>
          </div>
          <div className="col-md-6 mb-2">
            <strong>Date of Birth:</strong>{" "}
            <span className="text-muted">
              {moment(userProfile.dob).format("DD-MMM-YYYY")}
            </span>
          </div>
          <div className="col-md-6 mb-2">
            <strong>Address:</strong>{" "}
            <span className="text-muted">{userProfile.address}</span>
          </div>
        </div>
      </div>
    </FadeInBottom>
  );

  const renderLeaveManagement = () => (
    <FadeInBottom stagger={0.1} y={1000} ref={animationRef}>
      <div className="d-flex justify-content-between align-items-center">
        <h6>Leave Management</h6>
      </div>
      <div className="row text-center mb-4">
        <div className="col-md-3">
          <div className="border rounded p-3 bg-light">
            <h4 className="text-primary">{usedLeaves}</h4>
            <p className="text-muted mb-0">Pending Leave</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="border rounded p-3 bg-light">
            <h4 className="text-warning">{approvedLeave}</h4>
            <p className="text-muted mb-0">Approved Leave</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="border rounded p-3 bg-light">
            <h4 className="text-warning">{rejectedLeave}</h4>
            <p className="text-muted mb-0">Rejected Leave</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="border rounded p-3 bg-light">
            <h4>{usedLeaves + approvedLeave + rejectedLeave}</h4>
            <p className="text-muted mb-0">Total Leave</p>
          </div>
        </div>
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
                      ? "bg-success rounded-pill"
                      : leave.status === "Rejected"
                        ? "bg-danger rounded-pill"
                        : "bg-secondary rounded-pill"
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
    </FadeInBottom>
  );

  const renderPerformance = () => (
    <FadeInBottom stagger={0.1} y={1000} ref={animationRef}>
      <div className="row mt-4">
        <div className="col-md-6 text-center">
          <h6>Attendance Distribution</h6>
          <Pie data={attendanceChart} />
        </div>
        <div className="col-md-6 text-center">
          <h6>Leave Usage</h6>
          <Pie data={leaveChart} />
        </div>
      </div>
    </FadeInBottom>
  );

  return (
    <div className="container my-5">
      {/* Profile Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <FadeInWords
          x={-150}
          stagger={0.1}
          ref={animationRef}
          className="d-flex align-items-center gap-3"
        >
          <img
            src="https://imgs.search.brave.com/xNdwmua1sddi8xogq2coQ0xFES263fs2TabIR5co4_E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRUFHTkto/SVB5Z0UvMi8wLzE2/MDB3L2NhbnZhLWJs/dWUtbWluaW1hbGlz/dC1jaXJjbGUtZnJh/bWVkLWluc3RhZ3Jh/bS1wcm9maWxlLXBp/Y3R1cmUteXdfUFRX/TnhkTmcuanBn"
            alt="Profile"
            className="rounded-circle"
            width="70"
            height="70"
          />
          <div>
            <h5 className="mb-0">{userProfile.name}</h5>
            <small className="text-muted">
              Employee ID: {userProfile.employeeId} | {userProfile.designation}
            </small>
          </div>
        </FadeInWords>
        {activeTab === "Profile Data" && (
          <FadeInWords
            x={150}
            stagger={0.1}
            ref={animationRef}
            className="d-flex align-items-center gap-3"
          >
            <button
              className="btn btn-outline-secondary"
              onClick={() => {
                setShowAddModal(true);
                setEntryType("Profile");
              }}
            >
              Edit Profile
            </button>
          </FadeInWords>
        )}
        {activeTab === "Leave Management" && (
          <FadeInWords
            x={150}
            stagger={0.1}
            ref={animationRef}
            className="d-flex align-items-center gap-3"
          >
            <button
              className="btn btn-outline-secondary"
              onClick={() => {
                setShowAddModal(true);
                setEntryType("Leave");
              }}
            >
              Add Leave
            </button>
          </FadeInWords>
        )}
        {activeTab === "Attendance" && (
          <FadeInWords
            x={150}
            stagger={0.1}
            ref={animationRef}
            className="d-flex align-items-center gap-3"
          >
            <button
              className="btn btn-outline-secondary"
              onClick={() => {
                setShowAddModal(true);
                setEntryType("Attendance");
              }}
            >
              Add Attendance
            </button>
          </FadeInWords>
        )}
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        <FadeIn
          stagger={0.1}
          y={1000}
          ref={animationRef}
          className={`nav nav-tabs mb-4`}
        >
          {[
            "Attendance",
            "Leave Management",
            "Profile Data",
            "Performance",
          ].map((tab) => (
            <li className="nav-item" key={tab}>
              <button
                className={`nav-link ${activeTab === tab ? "active fw-bold" : ""
                  }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            </li>
          ))}
        </FadeIn>
      </ul>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {activeTab === "Attendance"
              ? "Add Attandance"
              : activeTab === "Leave Management"
                ? "Add Leave"
                : activeTab === "Profile Data"
                  ? "Update Profile Data"
                  : null}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {activeTab === "Attendance" && (
            <Form>
              <Form.Group controlId="formBasicName" className="mb-3">
                <Form.Label className="form-label">Date</Form.Label>
                <Form.Control
                  type="date"
                  className="form-control mb-3"
                  name="date"
                  value={attadence.date}
                  min={moment().format("YYYY-MM-DD")}
                  onChange={handleProjectInputChange}
                />
                <Form.Label className="form-label">Day</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control mb-3"
                  name="day"
                  readOnly
                  value={attadence.day}
                  onChange={handleProjectInputChange}
                />
                <Form.Label className="form-label">Time</Form.Label>
                <Form.Control
                  type="time"
                  className="form-control"
                  name="punchIn"
                  value={attadence.punchIn}
                  onChange={handleProjectInputChange}
                />
              </Form.Group>
            </Form>
          )}
          {activeTab === "Leave Management" && (
            <Form>
              <Form.Group controlId="formBasicName" className="mb-3">
                <Form.Group className="mb-3">
                  <div className="row">
                    <div className="col-auto">
                      <Form.Check
                        type="radio"
                        label="Single Day"
                        name="myRadioGroup"
                        id="radio-SingleDay"
                        value="Single Day"
                        checked={selectedOption === "Single Day"}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-auto">
                      <Form.Check
                        type="radio"
                        label="Multiple Days"
                        name="myRadioGroup"
                        id="radio-MultipleDays"
                        value="Multiple Days"
                        checked={selectedOption === "Multiple Days"}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </Form.Group>
                <Form.Label className="form-label">
                  {selectedOption === "Single Day" ? "Date" : "First Date"}
                </Form.Label>
                <Form.Control
                  type="date"
                  className="form-control mb-3"
                  name="firstDate"
                  value={leave.firstDate}
                  placeholder="DD-MM-YYYY"
                  min={moment().format("YYYY-MM-DD")}
                  onChange={handleProjectInputChange}
                />
                {selectedOption === "Multiple Days" && (
                  <>
                    <Form.Label className="form-label">End Date</Form.Label>
                    <Form.Control
                      type="date"
                      className="form-control mb-3"
                      name="endDate"
                      placeholder="DD-MM-YYYY"
                      value={leave.endDate}
                      min={moment(leave.firstDate).add(1, 'days').format("YYYY-MM-DD")}
                      onChange={handleProjectInputChange}
                    />
                  </>
                )}
                <Form.Label className="form-label">Leave Type</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="mb-3"
                  name="Leave Type"
                  value={leave.type}
                  onChange={handleProjectInputChange}
                >
                  <option>Select Leave Type</option>
                  <option value="Vacation">Vacation</option>
                  <option value="Function">Function</option>
                  <option value="Personal Reason">Personal Reason</option>
                  <option value="Medical">Medical</option>
                </Form.Select>
                <Form.Label className="form-label">Reason</Form.Label>
                <Form.Control
                  as="textarea"
                  className="form-control"
                  name="reason"
                  value={leave.reason}
                  onChange={handleProjectInputChange}
                />
              </Form.Group>
            </Form>
          )}
          {activeTab === "Profile Data" && (
            <Form.Group controlId="formBasicName">
              <Form.Label className="form-label">Name</Form.Label>
              <Form.Control
                type="text"
                className="form-control mb-3"
                name="name"
                value={profileData.name}
                onChange={handleProjectInputChange}
              />
              <Form.Label className="form-label">Number</Form.Label>
              <Form.Control
                type="text"
                className="form-control mb-3"
                name="mobile"
                value={profileData.mobile}
                onChange={handleProjectInputChange}
              />
              <Form.Label className="form-label">DOB</Form.Label>
              <Form.Control
                type="date"
                className="form-control mb-3"
                name="dob"
                value={profileData.dob}
                onChange={handleProjectInputChange}
              />
              <Form.Label className="form-label">Address</Form.Label>
              <Form.Control
                as="textarea"
                className="form-control mb-3"
                name="address"
                value={profileData.address}
                onChange={handleProjectInputChange}
              />
            </Form.Group>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddTask}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Tab Content */}
      {activeTab === "Attendance" && renderAttendance()}
      {activeTab === "Leave Management" && renderLeaveManagement()}
      {activeTab === "Profile Data" && renderProfileData()}
      {activeTab === "Performance" && renderPerformance()}
    </div>
  );
};

export default ProfilePage;
