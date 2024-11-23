import * as z from 'zod'

const TodoItemModel = z.object({
  id: z.string(),
  description: z.string(),
  isComplete: z.boolean(),
  dueDate: z.string().nullable(),
})
const TodoItemList = z.array(TodoItemModel)

export type TodoItemModel = z.infer<typeof TodoItemModel>

const GET_URL = 'https://b0f179aa-a791-47b5-a7ca-5585ba9e3642.mock.pstmn.io/get'
const PATCH_URL =
  'https://b0f179aa-a791-47b5-a7ca-5585ba9e3642.mock.pstmn.io/patch'

export async function fetchTodoItems(): Promise<TodoItemModel[]> {
  const response = await sendFetch(GET_URL, {
    method: 'GET',
  })
  const items: unknown = await response.json()

  return TodoItemList.parse(items)
}

export async function toggleTodoItem(
  id: string,
  isComplete: boolean
): Promise<void> {
  const response = await sendFetch(`${PATCH_URL}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ isComplete }),
  })
  const { status }: { status: string } = await response.json()
  if (status !== 'success') {
    console.error(response)
    throw new Error('something went wrong!')
  }
}

async function sendFetch(url: string, init: RequestInit = {}) {
  const apiKey = import.meta.env.VITE_API_KEY
  if (!apiKey) {
    throw new Error(
      'Error: expected environment variable "VITE_API_KEY". Please see the README for instructions.'
    )
  }
  init.headers = { 'X-Api-Key': apiKey }

  return fetch(url, init)
}
