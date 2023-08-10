type Merge<F, S> = {
  [K in keyof F | keyof S]: K extends keyof S ? S[K] : K extends keyof F ? F[K] : never
}

type foo = {
  name: string
  age: string
}

type coo = {
  age: number
  sex: string
}

type MyResult = Merge<foo, coo>
