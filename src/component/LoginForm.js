import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/Auth";
import { setToken } from "../utils/auth";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const { token } = await loginUser({ username: username, password });
      setIsLoading(false);
      setToken(token);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid username or password");
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
