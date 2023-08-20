type Chainable<T = {}> = {
  option: <K extends string, V>(
    key: K extends keyof T ? never : K,
    value: V
  ) => Chainable<Omit<T, K> & Record<K, V>>
  get: () => T
}

declare const config: Chainable

const result = config
  .option("foo", 123)
  .option("name", "type-challenges")
  .option("bar", { value: "Hello World" })
  .get()

interface ResultConfig {
  foo: number
  name: string
  bar: {
    value: string
  }
}
