// src/pages/Home.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "./utils/auth";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return null; // or a loading spinner
}
