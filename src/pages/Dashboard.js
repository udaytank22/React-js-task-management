import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Legend,
} from "recharts";

export default function Dashboard() {
    return (
        <div className="container mt-5">
            <h3 className="mb-4 fw-bold">Dashboard Overview</h3>
            <div className="row">
                {/* Pending Tasks */}
                <div className="col-md-4">
                    <div className="card shadow-sm border-0 h-100 bg-warning-subtle">
                        <div className="card-body d-flex flex-column justify-content-center align-items-start">
                            <div className="mb-3">
                                <i className="bi bi-hourglass-split fs-2 text-warning"></i>
                            </div>
                            <h5 className="card-title fw-semibold">Pending Tasks</h5>
                            <p className="card-text">Total Pending Tasks: <strong>22</strong></p>
                        </div>
                    </div>
                </div>

                {/* In Progress Tasks */}
                <div className="col-md-4">
                    <div className="card shadow-sm border-0 h-100 bg-info-subtle">
                        <div className="card-body d-flex flex-column justify-content-center align-items-start">
                            <div className="mb-3">
                                <i className="bi bi-arrow-repeat fs-2 text-info"></i>
                            </div>
                            <h5 className="card-title fw-semibold">In Progress</h5>
                            <p className="card-text">Total In-Progress Tasks: <strong>10</strong></p>
                        </div>
                    </div>
                </div>

                {/* Completed Tasks */}
                <div className="col-md-4">
                    <div className="card shadow-sm border-0 h-100 bg-success-subtle">
                        <div className="card-body d-flex flex-column justify-content-center align-items-start">
                            <div className="mb-3">
                                <i className="bi bi-check-circle fs-2 text-success"></i>
                            </div>
                            <h5 className="card-title fw-semibold">Completed Tasks</h5>
                            <p className="card-text">Total Completed Tasks: <strong>34</strong></p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row g-4 mt-4">
                {/* Total Attendance Target Card */}
                <div className="col-md-6">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Total Attendance Target</h5>
                            <p className="card-text">
                                Target Hours: <strong>160 hrs</strong>
                            </p>
                            <div className="progress" style={{ height: "20px" }}>
                                <div
                                    className="progress-bar bg-secondary"
                                    style={{ width: "100%" }}
                                >
                                    160 hrs
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Working Hours Achieved */}
                <div className="col-md-6">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Total Hours Worked</h5>
                            <p className="card-text">
                                Completed: <strong>145 hrs</strong>
                            </p>
                            <div className="progress" style={{ height: "20px" }}>
                                <div
                                    className="progress-bar bg-success"
                                    role="progressbar"
                                    style={{ width: `${(145 / 160) * 100}%` }}
                                    aria-valuenow={145}
                                    aria-valuemin={0}
                                    aria-valuemax={160}
                                >
                                    145 hrs
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* <div className="row g-4">
                Attendance Chart
                <div className="col-md-6">
                    <div className="card shadow-sm border-0 h-100">
                        <div className="card-body">
                            <h5 className="card-title fw-semibold mb-3">Attendance Overview</h5>
                            <ResponsiveContainer width="100%" height={250}>
                                <LineChart data={attendanceData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="day" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="present" stroke="#0d6efd" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                Working Hours Chart
                <div className="col-md-6">
                    <div className="card shadow-sm border-0 h-100">
                        <div className="card-body">
                            <h5 className="card-title fw-semibold mb-3">Working Hours</h5>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={hoursData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="day" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="hours" fill="#198754" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div> */}
        </div >
    );
}
