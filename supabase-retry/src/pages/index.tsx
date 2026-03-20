import { Header } from '@/components/common/Header'
import { Main } from '@/components/common/Main'

import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'

type Todo = {
  id: number
  name: string
  description?: string
}

export default function Page() {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    async function getTodos() {
      const { data: todos } = await supabase.from('todos').select()

      if (todos) {
        setTodos(todos)
      }
    }
    getTodos()
  }, [])

  return (
    <>
      <Header />
      <Main>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.name} {todo.description ?? ''}</li>
          ))}
        </ul>
      </Main>
    </>
  )
}