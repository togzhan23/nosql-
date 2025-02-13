const API_URL = "http://localhost:3000/auth";

function showMessage(message, isError = true) {
    const msgElement = document.getElementById("message");
    msgElement.innerText = message;
    msgElement.className = isError ? "error-message" : "success-message";
}

function validateInput(type) {
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let username = type === "register" ? document.getElementById("username").value.trim() : null;

    if (type === "register" && (!username || username.length < 3 || username.length > 30)) {
        showMessage("Username must be between 3 and 30 characters.");
        return false;
    }

    if (!email || !email.includes("@")) {
        showMessage("Invalid email format.");
        return false;
    }

    if (!password || password.length < 6) {
        showMessage("Password must be at least 6 characters.");
        return false;
    }

    return true;
}

async function register() {
    if (!validateInput("register")) return;

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();
    if (response.ok) {
        showMessage("Registration successful! Redirecting to login...", false);
        setTimeout(() => window.location.href = "index.html", 2000);
    } else {
        showMessage(data.errors ? data.errors[0].msg : data.message);
    }
}

async function login() {
    if (!validateInput("login")) return;

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem("token", data.token);
        showMessage("Login successful! Redirecting...", false);
        setTimeout(() => window.location.href = "todo.html", 2000);
    } else {
        showMessage(data.errors ? data.errors[0].msg : data.message);
    }
}
