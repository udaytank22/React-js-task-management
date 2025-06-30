import { getToken } from "../utils/auth";

REACT_APP_BASE_URL =
  "https://projects.jatayutechnologies.com/jatayu-software/public/api/";

const baseUrl = `${REACT_APP_BASE_URL}authenticate-user`;
console.log("baseUrl", baseUrl);
export async function loginUser({ username, password }) {
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  const data = await res.json(); // parse response body
  //   setToken(data?.data?.api_token);
  console.log("response data", data); // log actual data
  return data;
}

const userCount = `${REACT_APP_BASE_URL}work-log-count-by-status`;

export async function fetchTotalCount() {
  const token = getToken();
  const res = await fetch(userCount, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Attach the token here
      body: JSON.stringify({}), // If no body is required, keep it empty
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch count");
  }

  const data = await res.json();
  console.log("Total count response:", data);
  return data;
}

const performanceReport = `${REACT_APP_BASE_URL}get-staff-performance-report`;

export async function fetchPerformanceReport() {
  const token = getToken();
  // Get token from localStorage/session

  const res = await fetch(performanceReport, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Attach the token here
      body: JSON.stringify({}), // If no body is required, keep it empty
    },
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }
  if (!res.ok) {
    throw new Error("Failed to fetch count");
  }

  return res.json(); // Expected: { token, user }
  const data = await res.json();
  console.log("Total count response:", data);
  return data;
}

const projectList = `${REACT_APP_BASE_URL}alloted-projects-list`;

export async function fetchProjectList() {
  const token = getToken();
  console.log("Token in fetchProjectList:", token);
  // Get token from localStorage/session

  const res = await fetch(projectList, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Attach the token here
      body: JSON.stringify({}), // If no body is required, keep it empty
    },
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }
  if (!res.ok) {
    throw new Error("Failed to fetch count");
  }

  const data = await res.json();
  console.log("Total count response:", data);
  return data;
}

const projectModuleList = `${REACT_APP_BASE_URL}get-project-by-work-module-name`;

export async function fetchProjectModuleList({ projectId }) {
  const token = getToken();
  console.log("Token in fetchProjectList:", token);
  // Get token from localStorage/session

  const res = await fetch(projectModuleList, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Attach the token here
      body: JSON.stringify({ projectId }), // If no body is required, keep it empty
    },
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }
  if (!res.ok) {
    throw new Error("Failed to fetch count");
  }

  const data = await res.json();
  console.log("Total count response:", data);
  return data;
}
