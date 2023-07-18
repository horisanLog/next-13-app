import { Todo } from "@/components/Todo"
import { Suspense } from "react"

export default function Home() {
  return (
    <>
      <h1>Demo project</h1>
      <p>Nested layouts in Next.js</p>
      <Suspense fallback={<p>Loading feed...</p>}>
        <Todo />
      </Suspense>
    </>
  )
} 
