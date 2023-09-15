export function createTodo(text) {
  return {
      id: crypto.randomUUID(),
      text,
      done: false,
  }
}