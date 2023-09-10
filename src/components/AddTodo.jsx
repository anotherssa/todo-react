import { useState } from 'react';
import styles from '../App.module.css';

export default function AddTodo({ addTodo }) {
  const [newTodoText, setNewTodoText] = useState('');

  return (
    <div className={styles.addTodoWrapper}>
      <input 
        type="text"
        className={styles.input}
        placeholder="Enter todo"
        value={newTodoText} 
        onChange={e => setNewTodoText(e.target.value)}
        onKeyDown={e => {
          if (e.code == 'Enter') {
            addTodo(newTodoText);
            setNewTodoText('');
          }
        }}
        autoFocus
      />
      <button title="Add" onClick={addTodo} className={styles.addTodoButton}>+</button>
    </div>
  );
}