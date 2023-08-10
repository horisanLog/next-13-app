type Pop<T extends any[]> = T extends [...infer U, any] ? U : never

type array1 = ['a', 'b', 'c', 'd']
type array2 = [3, 2, 1]

type re1 = Pop<array1> // expected to be ['a', 'b', 'c']
type re2 = Pop<array2> // expected to be [3, 2]
