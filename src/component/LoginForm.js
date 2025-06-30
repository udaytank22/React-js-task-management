import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../redux/taskSlice";
import { useDispatch } from "react-redux";
import { setToken } from "../utils/auth";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await dispatch(loginUser({ username, password })).unwrap();
      console.log("Logged in as:", result);
      setToken(result.api_token);
      navigate("/dashboard");
    } catch (loginError) {
      // User not found → try register
      try {
        const result = await dispatch(
          registerUser({ username, password })
        ).unwrap();
        console.log("Registered and logged in:", result);
        setToken(result.api_token);
        navigate("/dashboard");
      } catch (registerError) {
        setError(registerError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label fw-semibold">Username</label>
        <input
          type="username"
          className="form-control"
          placeholder="Enter username address"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && <div className="alert alert-danger py-2">{error}</div>}

      <button
        type="submit"
        className="btn btn-primary w-100 mb-2 d-flex align-items-center justify-content-center"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
            Logging in...
          </>
        ) : (
          "Login"
        )}
      </button>
    </form>
  );
}
