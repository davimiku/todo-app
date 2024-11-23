import { TodoItem } from '../TodoItem/TodoItem'
import { useTodoItems } from './useTodoItems'
import './TodoItemList.css'

export function TodoItemList() {
  const { isLoading, todoItems, handleToggle } = useTodoItems()

  if (isLoading) {
    return '🕒 Loading...'
  }

  return (
    <div className='todo-item-list'>
      {todoItems.map((item) => (
        <TodoItem key={item.id} onToggle={handleToggle} {...item} />
      ))}
    </div>
  )
}
