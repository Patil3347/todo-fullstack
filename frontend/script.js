const API_URL = "http://localhost:5000/api/todos";

async function fetchTodos() {
  const res = await fetch(API_URL);
  const todos = await res.json();

  const list = document.getElementById("todoList");
  list.innerHTML = "";

  todos.forEach(todo => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = todo.title;

    if (todo.completed) {
      span.classList.add("completed");
    }

    // toggle completed
    span.onclick = () => toggleTodo(todo._id);

    // delete button
    const btn = document.createElement("button");
    btn.textContent = "❌";
    btn.onclick = () => deleteTodo(todo._id);

    li.appendChild(span);
    li.appendChild(btn);
    list.appendChild(li);
  });
}

async function addTodo() {
  const input = document.getElementById("todoInput");
  const title = input.value.trim();

  if (!title) return;

  await fetch(`${API_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })
  });

  input.value = "";
  fetchTodos();
}

async function deleteTodo(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  fetchTodos();
}

async function toggleTodo(id) {
  await fetch(`${API_URL}/${id}`, { method: "PUT" });
  fetchTodos();
}

fetchTodos();
