// src/utils/auth.js
export function setToken(token) {
    localStorage.setItem("authToken", token);
}

export function getToken() {
    return localStorage.getItem("authToken");
}

export function removeToken() {
    localStorage.removeItem("authToken");
}

export function logout() {
    removeToken();
    window.location.href = "/login";
}
