import { motion } from "framer-motion";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function TodoItem({ todo, onDelete, onToggle }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: todo._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <motion.li
      ref={setNodeRef}
      style={{ ...styles.item, ...style }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* DRAG HANDLE */}
      <span
        {...attributes}
        {...listeners}
        style={styles.dragHandle}
        title="Drag to reorder"
      >
        ☰
      </span>

      {/* TODO TEXT (CLICK TO COMPLETE) */}
      <span
        onClick={() => onToggle(todo._id)}
        style={{
          ...styles.text,
          textDecoration: todo.completed ? "line-through" : "none",
          opacity: todo.completed ? 0.6 : 1
        }}
      >
        {todo.title}
      </span>

      {/* DELETE */}
      <button onClick={() => onDelete(todo._id)}>❌</button>
    </motion.li>
  );
}

const styles = {
  item: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px",
    background: "#f1f5f9",
    borderRadius: "10px",
    marginBottom: "10px"
  },
  dragHandle: {
    cursor: "grab",
    fontSize: "18px",
    userSelect: "none"
  },
  text: {
    flex: 1,
    cursor: "pointer"
  }
};

export default TodoItem;
