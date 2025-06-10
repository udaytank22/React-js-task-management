import LoginForm from "../component/LoginForm";
import Logo from '../assets/images/logo.png'
export default function Login() {
  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div
        className="row shadow rounded-4 overflow-hidden"
        style={{ maxWidth: "960px", width: "100%" }}
      >
        {/* Left Panel */}
        <div className="col-md-6 bg-primary text-white p-5 d-flex flex-column justify-content-center align-items-center text-center">
          <img
            src={Logo}
            alt="Logo"
            style={{
              width: "200px",
              height: "200px",
              animation: "pulse 2s infinite",
            }}
          />
          <h4 className="fw-bold ">Stay Organized, Stay Ahead</h4>
          <p className=" text-light">
            Sign in to manage your tasks, track deadlines, and boost your team's productivity. Plan smart and stay focused.
          </p>
        </div>


        {/* Right Panel */}
        <div className="col-md-6 bg-white p-5">
          <h4 className="fw-bold mb-1">Welcome Back 👋</h4>
          <p className="text-muted mb-4">Log in to your Task Manager account</p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
