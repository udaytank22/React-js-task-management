// src/utils/auth.js (Assuming this is the file name)

export function setToken(token) {
  // Always good to add a check, even if input should be valid
  if (typeof token !== "string" || token === null || token === undefined) {
    console.error("❌ setToken received an invalid token:", token);
    // Optionally, you might want to remove a stale token if an invalid one is passed
    // sessionStorage.removeItem("authToken");
    return; // Exit if the token is invalid
  }

  sessionStorage.setItem("authToken", token);
  console.log("✅ Token successfully set in sessionStorage:", token);
}

export function getToken() {
  const token = sessionStorage.getItem("authToken");
  console.log("🔍 Calling getToken. Retrieved token:", token);
  // sessionStorage.getItem returns null if the item doesn't exist.
  // Returning null directly is often better than implicitly undefined.
  return token;
}

export function removeToken() {
  sessionStorage.removeItem("authToken");
  console.log("🗑️ Token removed from sessionStorage.");
}

export function logout() {
  removeToken();
  // Ensure you use a router (like React Router DOM) for proper navigation in React SPAs
  // window.location.href forces a full page reload, which might not be desired.
  // If using React Router, you'd use `Maps('/login')`
  window.location.href = "/login"; // This will redirect the user to the login page
  console.log("🚪 User logged out. Redirecting to /login.");
}
