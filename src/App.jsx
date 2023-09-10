import { useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import styles from './App.module.css';
import AddTodo from './components/AddTodo';
import TodoItem from './components/TodoItem';

function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [filter, setFilter] = useState('all');
  let visibleTodos = todos;

  function handleToggle(id, nextDone) {
    setTodos(todos.map(todo => todo.id === id ?  { ...todo, done: nextDone } : todo));
  }

  function handleUpdate(id, nextText) {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, text: nextText } : todo));
  }

  function handleDelete(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  function addTodo(newTodoText) {
    const newTodo = {
      id: crypto.randomUUID(),
      text: newTodoText,
      done: false,
    }

    setTodos([...todos, newTodo])
  }

  if (filter === 'active') {
    visibleTodos = todos.filter(todo => !todo.done)
  } else if (filter === 'done') {
    visibleTodos = todos.filter(todo => todo.done)
  }

  return (
    <div className={styles.todosApp}>
      <h1>Todos</h1>
      <AddTodo addTodo={addTodo} />

      {visibleTodos.map(todo => 
        <TodoItem 
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
      
      <div>
        <label htmlFor="filter">Show: </label>
        <select id="filter" value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="done">Done</option>
        </select>
      </div>
    </div>
  )
}

export default App
