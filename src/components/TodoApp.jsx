import { useState } from 'react';
import { useTodos } from '../hooks/todosContext';

import AddTodo from './AddTodo';
import TodoList from './TodoList';

export default function TodoApp() {
  const todos = useTodos();
  const [filter, setFilter] = useState('all');
  let visibleTodos = todos;

  if (filter === 'active') {
    visibleTodos = todos.filter(todo => !todo.done);
  } else if (filter === 'done') {
    visibleTodos = todos.filter(todo => todo.done);
  }
  
  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">
      <h1 className="text-center text-5xl font-bold text-blue-600 mb-4">Todos</h1>

      <div className="mb-4 border border-slate-300 rounded bg-white shadow">
        <AddTodo />
        <TodoList todos={visibleTodos} />
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
  );
}