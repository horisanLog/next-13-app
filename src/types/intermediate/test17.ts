type AppendToObject<T extends {}, U extends string, V> = {
  [k in keyof T | U]: k extends keyof T ? T[k] : V
}

type TestID = { id: "1" }

type ResultAppend = AppendToObject<TestID, "value", 4> // expected to be { id: '1', value: 4 }
