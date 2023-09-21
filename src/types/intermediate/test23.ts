type StringToUnionType<S> = S extends `${infer F}${infer R}`
  ? F | StringToUnionType<R>
  : S
type AllCombinations<
  S extends string,
  T extends string = StringToUnionType<S>,
  U extends string = T
> = S extends `${infer F}${infer R}`
  ? U extends U
    ? `${U}${AllCombinations<R, U extends "" ? T : Exclude<T, U>>}`
    : never
  : ""
type AllCombinations_ABC = AllCombinations<"ABC">
