type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer U}` ? U : `${T}`
type TestNumber = "-100";
type ResultNumber = Absolute<TestNumber>
