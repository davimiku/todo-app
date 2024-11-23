import React from 'react'
import {
  fetchTodoItems,
  TodoItemModel,
  toggleTodoItem,
} from '../TodoItemsService/TodoItemsService'

/**
 * Internal representation of a Todo Item for the UI
 */
export type TodoItem = TodoItemModel & {
  dueDateLabel: string
  isOverdue: boolean
  isLoading: boolean
}

export function useTodoItems() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [todoItems, setTodoItems] = React.useState<TodoItem[]>([])

  React.useEffect(() => {
    setIsLoading(true)

    async function fetchData() {
      const items = await fetchTodoItems()
      const sortedItems = items
        .map(withAdditionalInformation)
        .sort(byOverdueStatus)

      setTodoItems(sortedItems)
      setIsLoading(false)
    }

    fetchData()
  }, [])

  return {
    isLoading,
    todoItems: todoItems.sort(byOverdueStatus),
    handleToggle: async (id: string) => {
      const index = todoItems.findIndex((item) => item.id === id)
      const currentItem = todoItems[index]

      setTodoItems(todoItems.with(index, { ...currentItem, isLoading: true }))

      await toggleTodoItem(id, !currentItem.isComplete)

      const newItem = toggle(todoItems[index])
      const newItems = todoItems.with(index, newItem)
      setTodoItems(newItems.sort(byOverdueStatus))
    },
  }
}

function toggle(item: TodoItem): TodoItem {
  return {
    ...item,
    isComplete: !item.isComplete,
    isOverdue: isOverdue(item.dueDate, !item.isComplete),
  }
}

function withAdditionalInformation(item: TodoItemModel): TodoItem {
  const dueDate = item.dueDate ? new Date(item.dueDate) : null
  return {
    ...item,
    isLoading: false,
    dueDateLabel: dueDate?.toLocaleDateString() ?? '',
    isOverdue: isOverdue(item.dueDate, item.isComplete),
  }
}

function byOverdueStatus(a: TodoItem, b: TodoItem): number {
  // Complete items go to the bottom
  if (a.isComplete && !b.isComplete) return 1
  if (b.isComplete && !a.isComplete) return -1
  if (a.isComplete && b.isComplete) return 0

  // Non-overdue items go below overdue items
  if (a.isOverdue && !b.isOverdue) return -1
  if (b.isOverdue && !a.isOverdue) return 1
  if (!a.isOverdue && !b.isOverdue) return 0

  if (a.dueDate && b.dueDate) {
    return a.dueDate > b.dueDate ? 1 : -1
  }

  return 0
}

export function isOverdue(
  dueDate: string | null,
  isComplete: boolean
): boolean {
  if (!dueDate || isComplete) return false

  const today = new Date()
  return today > new Date(dueDate)
}
