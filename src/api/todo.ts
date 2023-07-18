import axios from "axios"

export type TodoType = {
  userId: number,
  id: number,
  title: string,
  body: string
}

export async function getData() {
  await new Promise((resolve) => setTimeout(resolve, 5000))
  const res = await axios.get("https://jsonplaceholder.typicode.com/posts")
  return res.data as TodoType[]
}
