import { Spinner } from '../Spinner/Spinner'
import './TodoItem.css'

export type TodoItemProps = {
  id: string
  description: string
  isComplete: boolean
  dueDate: string | null
  dueDateLabel: string
  isLoading: boolean
  isOverdue: boolean
  onToggle: (id: string) => void
}

export function TodoItem({
  description,
  isComplete,
  dueDate,
  id,
  dueDateLabel,
  isLoading,
  isOverdue,
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
    <div className={className(isComplete, isOverdue)}>
      {actionElement}
      <div className='description-container'>
        <span>
          {description} {isOverdue ? '(overdue)' : ''}
        </span>
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

function className(isComplete: boolean, isOverdue: boolean) {
  const base = 'todo-item'
  if (isComplete) {
    return base + ' complete'
  }
  if (isOverdue) {
    return base + ' overdue'
  }
  return base
}
