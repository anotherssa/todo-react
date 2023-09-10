import { useState, useRef, useEffect } from 'react';
import styles from '../TodoItem.module.css';

function TodoItem({ todo, onToggle, onUpdate, onDelete }) {
  const { id, done } = todo;
  const [text, setText] = useState(todo.text);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isEditing]);

  return (
    <div className={styles.todoItem + ' ' + (done ? styles.isDone : '')}>
      <input type="checkbox" checked={done} onChange={e => onToggle(id, e.target.checked)} />
      {!isEditing && 
        <div 
          className={styles.text}
          onDoubleClick={() => {
            setIsEditing(true);
          }}
        >{text}</div>
      }
      {isEditing && 
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          onBlur={() => {
            onUpdate(id, text);
            setIsEditing(false);
          }}
          onKeyDown={e => {
            if (e.code == 'Enter') {
              onUpdate(id, text);
              setIsEditing(false);
            }
          }}
        />
      }
      <button onClick={() => onDelete(id)} className={styles.delete}>×</button>
    </div>
  )
}

export default TodoItem;
