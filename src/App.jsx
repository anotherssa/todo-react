import { useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import AddTodo from './components/AddTodo';
import TodoItem from './components/TodoItem';

function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [filter, setFilter] = useState('all');
  let visibleTodos = todos;

  function handleToggle(id, nextDone) {
    setTodos(prevTodos => prevTodos.map(todo => todo.id === id ?  { ...todo, done: nextDone } : todo));
  }

  function handleUpdate(id, nextText) {
    setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? { ...todo, text: nextText } : todo));
  }

  function handleDelete(id) {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }

  function addTodo(newTodoText) {
    if (newTodoText == '') {
      return;
    }

    const newTodo = {
      id: crypto.randomUUID(),
      text: newTodoText,
      done: false,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
  }

  if (filter === 'active') {
    visibleTodos = todos.filter(todo => !todo.done)
  } else if (filter === 'done') {
    visibleTodos = todos.filter(todo => todo.done)
  }

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">
      <h1 className="text-center text-5xl font-bold text-blue-600 mb-4">Todos</h1>

      <div className="mb-4 border border-slate-300 rounded bg-white shadow">
        <AddTodo onAddTodo={addTodo} />
        {visibleTodos.map(todo => 
          <TodoItem 
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        )}
      </div>

      
      <div>
        <label htmlFor="filter">Show: </label>
        <select 
          id="filter" 
          className="py-1 rounded"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="done">Done</option>
        </select>
      </div>
    </div>
  )
}

export default App
