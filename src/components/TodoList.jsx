import TodoItem from "./TodoItem";

export default function TodoList({ todos }) {
  return (
    <>{todos.map(todo => <TodoItem  key={todo.id} todo={todo} /> )}</>
  );
}