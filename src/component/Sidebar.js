import { useState } from "react";
import { FaUserCircle, FaCodepen, FaTasks, FaUserCog } from "react-icons/fa";
import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsPower,
} from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../utils/auth";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const menuItems = [
    { icon: <FaUserCircle />, label: "Dashboard", path: "/dashboard" },
    { icon: <FaCodepen />, label: "project", path: "/project" },
    { icon: <FaTasks />, label: "Tasks", path: "/tasks" },
    { icon: <FaUserCog />, label: "Profile", path: "/profile" },
  ];

  return (
    <div
      style={{
        width: collapsed ? "80px" : "240px",
        backgroundColor: "#0F0F0F",
        color: "white",
        transition:
          "width 0.4s ease-in-out, border-radius 0.4s ease-in-out,  margin 0.4s ease-in-out",
        borderRadius: collapsed ? "40px" : "0px",
        padding: "20px 10px",
        display: "flex",
        flexDirection: "column",
        alignItems: collapsed ? "center" : "flex-start",
        justifyContent: "space-between",
        overflow: "hidden",
        margin: collapsed ? "20px" : "0",
      }}
    >
      {/* Top Section: Profile + Toggle */}
      <div style={{ width: "100%" }}>
        {/* Collapse/Expand Button + Profile */}
        <div
          style={{
            cursor: "pointer",
            alignSelf: collapsed ? "center" : "flex-end",
            marginBottom: "30px",
            transition: "all 0.3s",
          }}
        >
          <div
            className="d-flex align-items-center gap-3 mb-4"
            style={{
              transition: "all 0.4s ease",
              opacity: 1,
            }}
          >
            <img
              src="https://imgs.search.brave.com/xNdwmua1sddi8xogq2coQ0xFES263fs2TabIR5co4_E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRUFHTkto/SVB5Z0UvMi8wLzE2/MDB3L2NhbnZhLWJs/dWUtbWluaW1hbGlz/dC1jaXJjbGUtZnJh/bWVkLWluc3RhZ3Jh/bS1wcm9maWxlLXBp/Y3R1cmUteXdfUFRX/TnhkTmcuanBn"
              alt="Profile"
              className="rounded-circle"
              style={{
                width: "40px",
                height: "40px",
                transition: "all 0.4s ease",
              }}
            />
            <div
              style={{
                opacity: collapsed ? 0 : 1,
                width: collapsed ? 0 : "auto",
                whiteSpace: "nowrap",
                overflow: "hidden",
                transition: "opacity 0.4s ease, width 0.4s ease",
              }}
            >
              <div className="fw-bold">George Davidson</div>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <ul className="nav flex-column" style={{ width: "100%" }}>
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <li
                key={index}
                className="nav-item mb-3"
                style={{
                  backgroundColor: isActive ? "#D6C75E" : "transparent",
                  borderRadius: "10px",
                  padding: "10px",
                  display: "flex",
                  justifyContent: collapsed ? "center" : "flex-start",
                  alignItems: "center",
                  color: isActive ? "black" : "white",
                  transition: "all 0.3s ease",
                }}
              >
                <Link
                  to={item.path}
                  className="d-flex align-items-center text-decoration-none"
                  style={{
                    color: isActive ? "black" : "white",
                    gap: "15px",
                    width: "100%",
                  }}
                >
                  {item.icon}
                  <span
                    style={{
                      opacity: collapsed ? 0 : 1,
                      width: collapsed ? 0 : "auto",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      transition: "opacity 0.4s ease, width 0.4s ease",
                    }}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Footer */}
      <div style={{ width: "100%" }}>
        <div
          style={{
            width: "100%",
            textAlign: collapsed ? "center" : "left",
            marginTop: "auto",
            padding: "10px 0",
            transition: "all 0.4s",
            cursor: "pointer",
          }}
          onClick={toggleSidebar}
        >
          {collapsed ? (
            <BsChevronDoubleRight size={20} />
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                borderColor: "white",
                borderWidth: "0.5px",
                borderStyle: "groove",
                padding: "5px",
                borderRadius: "10px",
                transition: "all 0.3s",
              }}
            >
              <span style={{ marginRight: "10px" }}>Collapse</span>
              <BsChevronDoubleLeft size={20} />
            </div>
          )}
        </div>
        {/* logout */}
        <div
          style={{
            width: "100%",
            textAlign: collapsed ? "center" : "left",
            marginTop: "auto",
            padding: "10px 0",
            transition: "all 0.4s",
            cursor: "pointer",
          }}
          onClick={logout}
        >
          {collapsed ? (
            <BsPower size={20} />
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                borderColor: "white",
                borderWidth: "0.5px",
                borderStyle: "groove",
                padding: "5px",
                borderRadius: "10px",
                transition: "all 0.3s",
              }}
            >
              <span style={{ marginRight: "10px" }}>LogOut</span>
              <BsPower size={20} />
            </div>
          )}
        </div>
      </div>

      {/* {!collapsed && (
        <div
          style={{
            fontSize: "0.8rem",
            textAlign: "center",
            width: "100%",
            opacity: 1,
            transition: "opacity 0.4s ease-in-out",
          }}
        >
          Uday Tank © 2025
        </div>
      )} */}
    </div>
  );
}
