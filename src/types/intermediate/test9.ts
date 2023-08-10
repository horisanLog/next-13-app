type TupleToUnion<T extends any[]> = T[number]
type Arr = ["1", "2", "3"]

type TupleToUnionResult = TupleToUnion<Arr>
