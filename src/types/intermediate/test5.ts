type Last<T extends any[]> = T extends [...any[], infer U] ? U : never

type last1 = ["a", "b", "c"]
type last2 = [3, 2, 1]

type tail1 = Last<last1>
type tail2 = Last<last2>
