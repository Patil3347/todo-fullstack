import { arrayMove } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

const API_URL = "http://localhost:5000/api/todos";

function App() {
  const handleReorder = async (activeId, overId) => {
  const oldIndex = filteredTodos.findIndex(t => t._id === activeId);
  const newIndex = filteredTodos.findIndex(t => t._id === overId);

  const newOrder = arrayMove(filteredTodos, oldIndex, newIndex).map(
    (item, index) => ({
      _id: item._id,
      order: index
    })
  );

  setTodos(prev =>
    prev.map(todo => {
      const updated = newOrder.find(i => i._id === todo._id);
      return updated ? { ...todo, order: updated.order } : todo;
    })
  );

  await fetch(`${API_URL}/reorder`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: newOrder })
  });
};

  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");
  const [priority, setPriority] = useState("medium","low","high");
  const [priorityFilter, setPriorityFilter] = useState("all");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setTodos(data);
  };

  const addTodo = async () => {
  if (!text.trim()) return;

  console.log("Sending todo:", {
    title: text,
    priority
  });

  await fetch(`${API_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: text,
      priority
    })
  });

  setText("");
  setPriority("medium","low","high");
  fetchTodos();
};

  const deleteTodo = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchTodos();
  };

  const toggleTodo = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "PUT" });
    fetchTodos();
  };

  // FILTER LOGIC
  const filteredTodos = todos
  .filter(todo => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  })
  .filter(todo => {
    if (priorityFilter === "all") return true;
    return todo.priority === priorityFilter;
  })
  .sort((a, b) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });


  // DATE
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long"
  });

  return (
    <motion.div
      style={styles.container}
      initial={{ opacity: 0, scale: 0.9, y: 60 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Header */}
      <h1 style={{ marginBottom: "6px" }}>📝 My Todo App</h1>
      <p style={{ opacity: 0.8 }}>👋 Good day, Pratik</p>
      <p style={{ fontSize: "14px", opacity: 0.7, marginBottom: "18px" }}>
        {today}
      </p>

      {/* Input */}
      <TodoInput
  text={text}
  setText={setText}
  priority={priority}
  setPriority={setPriority}
  addTodo={addTodo}
/>


      {/* Task Counter */}
      <p style={{ fontSize: "14px", opacity: 0.85, marginTop: "10px" }}>
        {todos.length} tasks •{" "}
        {todos.filter(t => t.completed).length} completed
      </p>

      {/* Filters */}
      <div style={styles.filters}>
        {["all", "active", "completed"].map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            style={{
              ...styles.filterBtn,
              background:
                filter === type
                  ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                  : "transparent",
              color: filter === type ? "white" : "#111"
            }}
          >
            {type}
          </button>
        ))}
      </div>
      <div style={styles.priorityTabs}>
  {["all", "high", "medium", "low"].map(p => (
    <button
      key={p}
      onClick={() => setPriorityFilter(p)}
      style={{
        ...styles.tab,
        background:
          priorityFilter === p ? "#8b5cf6" : "transparent",
        color: priorityFilter === p ? "white" : "#333"
      }}
    >
      {p}
    </button>
  ))}
</div>


      {/* Todo List */}
      <TodoList
  todos={filteredTodos}
  deleteTodo={deleteTodo}
  toggleTodo={toggleTodo}
  onReorder={handleReorder}
/>


      {/* Footer hint */}
      <p style={{ fontSize: "12px", opacity: 0.6, marginTop: "16px" }}>
        💡 Tip: Click a task to mark it completed
      </p>
    </motion.div>
  );
}

const styles = {
  container: {
    width: "100%",
    maxWidth: "860px",
    padding: "28px",
    borderRadius: "18px",
    background: "rgba(255, 255, 255, 0.28)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    boxShadow: "0 25px 45px rgba(0,0,0,0.25)",
    border: "1px solid rgba(255,255,255,0.35)"
  },
  filters: {
    display: "flex",
    gap: "8px",
    margin: "18px 0"
  },
  filterBtn: {
    flex: 1,
    padding: "6px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "500"
  },
  priorityTabs: {
  display: "flex",
  gap: "8px",
  margin: "12px 0"
},
tab: {
  padding: "6px 12px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontWeight: 500
}

};

export default App;
