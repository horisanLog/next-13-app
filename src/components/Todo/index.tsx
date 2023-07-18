"use client"

import { getData } from "@/api/todo"
import { use} from "react"

export const Todo = () => {
  const data = use(getData())

  return (
    <div>
      <div>{`クライアントレンダリング: ${data[0]?.title}`}</div>
    </div>
  )
}
