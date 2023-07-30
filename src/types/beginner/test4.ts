type MyAwaited<T> = T extends Promise<infer R> ? R : never
type ExampleType = Promise<string>
type Result = MyAwaited<ExampleType>
