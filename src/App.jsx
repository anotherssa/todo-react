import { useState, useEffect } from 'react'
import styles from './App.module.css'
import TodoItem from './TodoItem'

function App() {
  const [newTodoText, setNewTodoText] = useState('')
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || [])
  const [filter, setFilter] = useState('all')
  let visibleTodos = todos

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  function handleToggle(id, nextDone) {
    setTodos(todos.map(todo => todo.id === id ?  { ...todo, done: nextDone } : todo))
   }

  function handleDelete(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function addTodo() {
    const newTodo = {
      id: crypto.randomUUID(),
      text: newTodoText,
      done: false,
    }

    setTodos([...todos, newTodo])
    setNewTodoText('')
  }

  if (filter === 'active') {
    visibleTodos = todos.filter(todo => !todo.done)
  } else if (filter === 'done') {
    visibleTodos = todos.filter(todo => todo.done)
  }

  return (
    <div className={styles.todosApp}>
      <h1>Todos</h1>
      <div className={styles.addTodoWrapper}>
        <input 
          type="text"
          className={styles.input}
          placeholder="Enter your todo"
          value={newTodoText} 
          onChange={e => setNewTodoText(e.target.value)}
          onKeyDown={e => e.code == 'Enter' && addTodo()}
        />
        <button title="Add" onClick={addTodo} className={styles.addTodoButton}>+</button>
      </div>

      {visibleTodos.map(todo => 
        <TodoItem 
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
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
