import './TodoItem.css'

export type TodoItemProps = {
  id: string
  description: string
  isComplete: boolean
  dueDate: string | null
}

export function TodoItem({ description, isComplete, dueDate }: TodoItemProps) {
  return (
    <div className='todo-item'>
      <input type='checkbox' checked={isComplete} />
      <span>{description}</span> <TodoItemDueDate dueDate={dueDate} />
    </div>
  )
}

function TodoItemDueDate({ dueDate }: { dueDate: string | null }) {
  if (!dueDate) return

  const localizedDate = new Date(dueDate).toLocaleDateString()

  return <time dateTime={dueDate}>{localizedDate}</time>
}
