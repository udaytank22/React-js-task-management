import { useState } from "react";
import {
  FaCogs,
  FaRegQuestionCircle,
  FaUserCog,
  FaHome,
  FaCodepen,
  FaTasks,
} from "react-icons/fa";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import { logout } from "../utils/auth";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const menuItems = [
    { icon: <FaHome />, label: "Home", path: "/dashboard" },
    { icon: <FaCodepen />, label: "project", path: "/project" },
    { icon: <FaTasks />, label: "Tasks" },
    { icon: <FaUserCog />, label: "Manage" },
    { icon: <FaRegQuestionCircle />, label: "FAQ" },
    { icon: <FaCogs />, label: "Settings" },
  ];

  return (
    <div
      className={`bg-dark text-white d-flex flex-column justify-content-between p-3`}
      style={{
        width: collapsed ? "80px" : "240px",
        transition: "width 0.3s",
        height: "100vh",
      }}
    >
      {/* Top Section */}
      <div>
        <div className="d-flex align-items-center justify-content-between mb-4">
          {!collapsed && <h4 className="m-0">🧠 Brainwave</h4>}
          <button
            className="btn btn-sm btn-outline-light"
            onClick={toggleSidebar}
          >
            {collapsed ? <BsChevronDoubleRight /> : <BsChevronDoubleLeft />}
          </button>
        </div>

        <ul className="nav flex-column gap-2">
          {menuItems.map((item, index) => (
            <li key={index} className="nav-item">
              <Link // Use Link instead of <a>
                to={item.path} // Use the path property for navigation
                className="nav-link d-flex align-items-center text-white"
              >
                <span className="me-2 fs-5">{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Section */}
      <div className="text-center mt-4">
        <button
          className="btn btn-outline-light btn-sm mb-2 w-100 d-flex align-items-center justify-content-center gap-2"
          onClick={logout} // Define this function in your component
        >
          <i className="bi bi-box-arrow-right"></i>
          {!collapsed && "Logout"}
        </button>
        <small className="text-white">
          {!collapsed ? "© 2025 TaskFlow" : "©"}
        </small>
      </div>
    </div>
  );
}
