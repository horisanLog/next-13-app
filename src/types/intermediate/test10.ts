type Trim<S extends string> = S extends `${" "}${infer R}` | `${infer R}${" "}`
  ? Trim<R>
  : S

type trimed = Trim<"  Hello World  ">
