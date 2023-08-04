type MyOmit<T, K> = {
  [P in Exclude<keyof T, K>]: T[P]
}

interface MyTodo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyOmit<MyTodo, "description" | "title">

const todo: TodoPreview = {
  completed: false,
}
