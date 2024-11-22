import { TodoItem } from '../TodoItem/TodoItem'
import { useTodoItems } from './useTodoItems'

export function TodoItemList() {
  const todoItems = useTodoItems()

  return (
    <>
      {todoItems.map((item) => (
        <TodoItem key={item.id} {...item} />
      ))}
    </>
  )
}
