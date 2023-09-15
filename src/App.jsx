import { TodosProvider } from './hooks/todosContext'; 
import TodoApp from './components/TodoApp';

function App() {
  return (
    <TodosProvider>
      <TodoApp />
    </TodosProvider>
  )
}

export default App
