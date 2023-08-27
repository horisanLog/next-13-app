import React, { useEffect } from "react"

// TypeScript 5.1でのCSSStyleRuleの定義（仮定）
interface CSSStyleRule {
  get style(): CSSStyleDeclaration
  set style(newValue: string)
}

interface Serializer {
  set value(v: string | number | boolean)
  get value(): string
}
declare let box: Serializer
// Allows writing a 'boolean'
box.value = true
// Comes out as a 'string'
console.log(box.value.toUpperCase())

const App: React.FC = () => {
  useEffect(() => {
    // スタイルシートを取得（ここでは最初のスタイルシートを取得しています）
    const styleSheet = document.styleSheets[0] as CSSStyleSheet

    // 新しいCSSルールを追加
    const ruleIndex = styleSheet.insertRule(".dynamic { color: red; }", 0)

    // CSSStyleRuleを取得
    const cssRule = styleSheet.cssRules[ruleIndex] as unknown as CSSStyleRule

    // スタイルを動的に設定（setアクセサを使用）
    cssRule.style = "color: blue;"

    // スタイルを取得してログに出力（getアクセサを使用）
    console.log(cssRule.style.cssText)
  }, [])

  return <div className="dynamic">Hello, this text should be blue!</div>
}

// 非同期関数
async function Foo() {
  return <div></div>
}

// エラー: 'Foo' cannot be used as a JSX component.
// Its return type 'Promise<Element>' is not a valid JSX element.
let element = <Foo />
element.props = { id: "bar" }

const x = <Bar a:b="hello" />;
const y = <Bar a : b="hello" />;

interface BarProps {
    "a:b": string;
}

function Bar(props: BarProps) {
    return <div>{props["a:b"]}</div>;
}

// ありがとうメッセージを表示する関数を作成して
// それを呼び出す関数を作成する
function Thanks(props: { name: string }) {
  return <span>Thanks, {props.name}!</span>
}
