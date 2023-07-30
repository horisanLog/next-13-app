type Concat<T extends any[], U extends any[]> = [...T, ...U]
type ConcatResult = Concat<[1], [2]>
