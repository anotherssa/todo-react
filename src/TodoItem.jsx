import styles from './TodoItem.module.css'

function TodoItem({ todo, onToggle, onDelete }) {
  const { id, text, done } = todo;

  return (
    <div className={styles.todoItem + ' ' + (done ? styles.isDone : '')}>
      <input type="checkbox" checked={done} onChange={e => onToggle(id, e.target.checked)} />
      <div className={styles.text}>{text}</div>
      <button onClick={() => onDelete(id)} className={styles.delete}>×</button>
    </div>
  )
}

export default TodoItem
