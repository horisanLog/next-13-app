type IsAny<T> = 0 extends 1 & T ? true : false

export type A = IsAny<string>
export type B = IsAny<any>

//  1 & Tは、Tと1の交差型を作成
// 0 extends 1 & Tは、0が1 & Tに代入可能かどうかを評価する
// any型の場合、1 & anyはanyに簡約され、0 extends anyは真になる
