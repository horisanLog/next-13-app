type StringToUnion<T extends string> = T extends `${infer F}${infer S}`
  ? F | StringToUnion<S>
  : never

type Test = "123"
type MyResultUnion = StringToUnion<Test>
