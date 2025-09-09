/**
 * accountAuthApi.js
 * Handles login and registration API calls for the account page
 */

// Sends email and password to backend API for logging in, returns result to be parsed
async function login(email, password) {
	const response = await fetch("http://localhost:5000/api/auth/login", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, password }),
		credentials: "include",
	});

	const result = await response.json();

	if (!response.ok) {
		const error = new Error(result.message || "Login failed");
		error.status = response.status;
		throw error;
	}
	return result;
}

// Sends email and password to backend API for registering user, returns result to be parsed
async function register(email, password) {
	const response = await fetch("http://localhost:5000/api/users", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, password }),
		credentials: "include",
	});

	const result = await response.json();
	if (!response.ok) {
		const error = new Error(result.message || "Registration failed");
		error.status = response.status;
		throw error;
	}

	return result;
}

export { login, register };
