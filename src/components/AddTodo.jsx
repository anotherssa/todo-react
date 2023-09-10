import { useState } from 'react';
import styles from '../App.module.css';

export default function AddTodo({ onAddTodo }) {
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
            onAddTodo(newTodoText);
            setNewTodoText('');
          }
        }}
        autoFocus
      />
      <button title="Add" onClick={() => onAddTodo(newTodoText)} className={styles.addTodoButton}>+</button>
    </div>
  );
}