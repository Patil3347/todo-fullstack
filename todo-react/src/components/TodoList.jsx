import {
  DndContext,
  closestCenter
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import TodoItem from "./TodoItem";

function TodoList({ todos, deleteTodo, toggleTodo, onReorder }) {
  return (
    <DndContext
  collisionDetection={closestCenter}
  onDragEnd={(event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      onReorder(active.id, over.id);
    }
  }}
>

      <SortableContext
        items={todos.map(t => t._id)}
        strategy={verticalListSortingStrategy}
      >
        <ul style={{ listStyle: "none", padding: 0 }}>
          {todos.map(todo => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onDelete={deleteTodo}
              onToggle={toggleTodo}
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}

export default TodoList;
