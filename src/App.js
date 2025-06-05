import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./pages/ProtectedRoute";
import Home from "./Home";
import Sidebar from "./component/Sidebar";

function AppLayout() {
  const location = useLocation();
  const hideSidebarRoutes = ["/login"];
  const shouldHideSidebar = hideSidebarRoutes.includes(location.pathname);

  return (
    <div className="d-flex">
      {!shouldHideSidebar && <Sidebar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
