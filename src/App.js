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
import { use, useEffect } from "react";

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
          {/* Default route: redirect from / to /dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {

  useEffect(() => {
    const permission = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Success callback: Access latitude and longitude
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log("Latitude:", latitude, "Longitude:", longitude);
          // Update state or perform actions with location data
        },
        (error) => {
          // Error callback: Handle permission denial or other issues
          console.error("Error getting location:", error.message);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 } // Optional options
      );

      navigator.mediaDevices.getUserMedia({
        video: true,
      }
      ).then((stream) => {
        // Success callback: Handle the media stream
        console.log("Media stream obtained:", stream);
        // You can use the stream for audio/video recording or other purposes
      }).catch((error) => {
        // Error callback: Handle permission denial or other issues
        console.error("Error accessing media devices:", error.message);
      });
    };

    permission();
  }, [])

  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
