type Push<T extends any[], U> = [...T, U]
type Unshift<T extends any[], U> = [U, ...T]
type Result1 = Push<[1, 2], "3"> // [1, 2, '3']
type Result2 = Unshift<[1, 2], 0> // [0, 1, 2,]
