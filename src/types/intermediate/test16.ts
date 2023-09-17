type AppendArgument<Fn, A> = Fn extends (...args: infer R) => infer P
  ? (...args: [...R, A]) => P
  : never

  type Fn = (a: number, b: string) => number

  type ResultAppend = AppendArgument<Fn, boolean> 


export const QUERY_KEYS = ["users", "post", "comments"] as const
export type Unpacked<T> = T extends { [K in keyof T]: infer U } ? U : never
export type QueryKeysTypes = Unpacked<typeof QUERY_KEYS>
