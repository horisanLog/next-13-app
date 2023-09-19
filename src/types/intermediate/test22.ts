type StrToArray<S> = S extends `${infer x}${infer xs}`
  ? [1, ...StrToArray<xs>]
  : []
type LengthOfString<S extends string> = StrToArray<S>["length"]

type TestLength = "123"
type ResultLength = LengthOfString<TestLength>
