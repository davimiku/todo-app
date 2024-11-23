import { Spinner } from '../Spinner/Spinner'
import { isOverdue } from '../TodoItemList/useTodoItems'
import './TodoItem.css'

export type TodoItemProps = {
  id: string
  description: string
  isComplete: boolean
  dueDate: string | null
  dueDateLabel: string
  isLoading: boolean
  onToggle: (id: string) => void
}

export function TodoItem({
  description,
  isComplete,
  dueDate,
  id,
  dueDateLabel,
  isLoading,
  onToggle,
}: TodoItemProps) {
  let actionElement: JSX.Element
  if (isLoading) {
    actionElement = <Spinner />
  } else {
    const ariaLabel = isComplete
      ? `Mark '${description}' as not done`
      : `Mark '${description}' as done`
    actionElement = (
      <input
        className='checkbox'
        type='checkbox'
        checked={isComplete}
        onChange={() => onToggle(id)}
        aria-label={ariaLabel}
      />
    )
  }

  return (
    <div className={className(dueDate, isComplete)}>
      {actionElement}
      <div className='description-container'>
        <span>{description}</span>{' '}
        <TodoItemDueDate dueDate={dueDate} dueDateLabel={dueDateLabel} />
      </div>
    </div>
  )
}

function TodoItemDueDate({
  dueDate,
  dueDateLabel,
}: Pick<TodoItemProps, 'dueDate' | 'dueDateLabel'>) {
  if (!dueDate) return ''

  return <time dateTime={dueDate}>{dueDateLabel}</time>
}

function className(dueDate: string | null, isComplete: boolean) {
  const base = 'todo-item'
  if (isComplete) {
    return base + ' complete'
  }
  if (isOverdue(dueDate, isComplete)) {
    return base + ' overdue'
  }
  return base
}
