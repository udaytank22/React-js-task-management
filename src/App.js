import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./pages/ProtectedRoute";
import Sidebar from "./component/Sidebar";
import Project from "./pages/Project";
import TaskDashboard from "./pages/Tasks";
import ProfilePage from "./pages/Profile";
import Map from "./pages/Map";
import { use, useEffect } from "react";
import { locationPermission, mediaPermission } from "./utils/permission";
import { UserLocationProvider } from "./context/UserLocation";

function AppLayout() {
  const location = useLocation();
  const hideSidebarRoutes = ["/login"];
  const shouldHideSidebar = hideSidebarRoutes.includes(location.pathname);

  return (
    <div className="d-flex">
      {!shouldHideSidebar && <Sidebar />}
      <div
        className="flex-grow-1 overflow-auto"
        style={{
          height: "100vh",
        }}
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/project"
            element={
              <ProtectedRoute>
                <Project />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <TaskDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/map"
            element={
              <ProtectedRoute>
                <Map />
              </ProtectedRoute>
            }
          />
          {/* Default route: redirect from / to /dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  // useEffect(() => {
  //   const handleUnload = () => {
  //     localStorage.removeItem("authToken"); // ✅ remove token
  //   };

  //   window.addEventListener("beforeunload", handleUnload);
  //   // also works with "pagehide"
  //   window.addEventListener("pagehide", handleUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleUnload);
  //     window.removeEventListener("pagehide", handleUnload);
  //   };
  // }, []);

  return (
    <UserLocationProvider>
      <Router>
        <AppLayout />
      </Router>
    </UserLocationProvider>
  );
}

export default App;
