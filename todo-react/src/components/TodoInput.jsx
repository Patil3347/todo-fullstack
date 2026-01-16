function TodoInput({ text, setText, priority, setPriority, addTodo }) {
  return (
    <div style={styles.wrapper}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter todo..."
        style={styles.input}
      />

      <select
        value={priority}
        onChange={(e) => {
          console.log("Selected priority:", e.target.value);
          setPriority(e.target.value);
        }}
        style={styles.select}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button onClick={addTodo} style={styles.btn}>
        Add
      </button>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    gap: "10px",
    marginBottom: "16px"
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "none"
  },
  select: {
    padding: "10px",
    borderRadius: "8px",
    border: "none"
  },
  btn: {
    padding: "10px 14px",
    background: "#8b5cf6",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  }
};

export default TodoInput;
