import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "./utils/auth";
import React from "react";

export default function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome to Our Portal</h1>
        <p style={styles.subtitle}>
          This page is currently unavailable or was not found.
        </p>
        <p style={styles.info}>
          If you believe this is a mistake, please contact the system
          administrator or return to the main site.
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    backgroundColor: "#f3f4f6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    padding: "40px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    textAlign: "center",
    maxWidth: "600px",
  },
  title: {
    fontSize: "32px",
    color: "#111827",
    marginBottom: "16px",
  },
  subtitle: {
    fontSize: "18px",
    color: "#374151",
    marginBottom: "8px",
  },
  info: {
    fontSize: "14px",
    color: "#6b7280",
  },
};
