// src/api/auth.js

const baseUrl = `${process.env.REACT_APP_BASE_URL}authenticate-user`;
console.log('baseUrl',baseUrl)
export async function loginUser({ username, password }) {
    const res = await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
        throw new Error("Login failed");
    }

    return res.json(); // Expected: { token, user }
}
