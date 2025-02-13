const API_URL = "http://localhost:3000/tasks";
const token = localStorage.getItem("token");

// 🔹 **Redirect to login if no token**
if (!token) {
    window.location.href = "login.html";
}

// 🔹 **Show messages in UI**
function showMessage(message, isError = true) {
    const msgElement = document.getElementById("message");
    msgElement.innerText = message;
    msgElement.className = isError ? "error-message" : "success-message";
}

// 🔹 **Fetch User's Tasks**
async function fetchTasks() {
    const response = await fetch(API_URL, {
        headers: { "Authorization": `Bearer ${token}` }
    });

    if (!response.ok) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("token");
        window.location.href = "login.html";
        return;
    }

    const tasks = await response.json();
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Clear previous tasks

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.setAttribute("id", `task-${task._id}`);
        li.innerHTML = `
            <span id="title-${task._id}">${task.title}</span>
            <span id="desc-${task._id}">${task.description}</span>
            <button class="edit-btn" onclick="editTask('${task._id}')">Edit</button>
            <button class="delete-btn" onclick="deleteTask('${task._id}')">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

// 🔹 **Client-side Validation**
function validateTask(title, description) {
    if (!title || title.length < 3) {
        alert("Title must be at least 3 characters.");
        return false;
    }
    if (title.length > 100) {
        alert("Title must be less than 100 characters.");
        return false;
    }
    if (description && description.length > 500) {
        alert("Description must be less than 500 characters.");
        return false;
    }
    return true;
}

// 🔹 **Create Task**
async function createTask() {
    const title = document.getElementById("taskTitle").value;
    const description = document.getElementById("taskDescription").value;

    if (!validateTask(title, description)) return;

    const response = await fetch(API_URL, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title, description })
    });

    if (!response.ok) {
        const data = await response.json();
        alert(data.message || "Error creating task.");
        return;
    }

    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDescription").value = "";
    fetchTasks();
}

// 🔹 **Edit Task (Show Inputs)**
function editTask(id) {
    const taskElement = document.getElementById(`task-${id}`);
    const title = document.getElementById(`title-${id}`).innerText;
    const description = document.getElementById(`desc-${id}`).innerText;

    taskElement.innerHTML = `
        <input type="text" id="edit-title-${id}" class="task-input" value="${title}" />
        <input type="text" id="edit-desc-${id}" class="task-input" value="${description}" />
        <button class="edit-btn" onclick="updateTask('${id}')">Save</button>
        <button class="cancel-btn" onclick="fetchTasks()">Cancel</button>
    `;
}

// 🔹 **Update Task**
async function updateTask(id) {
    const newTitle = document.getElementById(`edit-title-${id}`).value;
    const newDescription = document.getElementById(`edit-desc-${id}`).value;

    if (!validateTask(newTitle, newDescription)) return;

    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title: newTitle, description: newDescription })
    });

    if (!response.ok) {
        const data = await response.json();
        alert(data.message || "Error updating task.");
        return;
    }

    fetchTasks();
}

// 🔹 **Delete Task**
async function deleteTask(id) {
    const response = await fetch(`${API_URL}/${id}`, { 
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
    });

    if (!response.ok) {
        alert("Error deleting task.");
        return;
    }

    fetchTasks();
}

// 🔹 **Logout Function**
function logout() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}

// 🔹 **Load Tasks on Page Load**
document.addEventListener("DOMContentLoaded", fetchTasks);
