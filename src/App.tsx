import './App.css'
import { StickyHeader } from './Header/StickyHeader'
import { TodoItemList } from './TodoItemList/TodoItemList'

function App() {
  if (!import.meta.env.VITE_API_KEY) {
    return (
      <>
        `VITE_API_KEY` environment variable not found. Please follow the
        instructions in the README to add a `.env` file.
      </>
    )
  }
  return (
    <>
      <StickyHeader />
      <TodoItemList />
    </>
  )
}

export default App
