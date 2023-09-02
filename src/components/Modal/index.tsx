"use client"
import React, { useState, useRef, TouchEvent, useEffect } from "react"
import ReactDOM from "react-dom"

const FOOTER_BOTTOM = 71 // フッターの高さ

const modalStyle = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "white",
  maxHeight: "60vh",
  minHeight: "30vh",
  overflow: "auto",
  borderRadius: '15px 15px 0 0',
  paddingBottom: `${FOOTER_BOTTOM}px`, // フッターの高さ分余白を作る
} as const

const headerStyle = {
  padding: "10px",
  borderBottom: "1px solid #ccc",
  height: "50px",
} as const

const contentStyle = {
  padding: "10px",
  height: "fit-content", // ヘッダーとフッターの高さを引く
  overflow: "auto",
} as const

const footerStyle = {
  padding: "10px",
  borderTop: "1px solid #ccc",
  position: "fixed",
  height: "50px",
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "white",
} as const

// interface ModalProps {
//   isOpen: boolean
//   onClose: () => void
// }

interface ModalProps {
  level: number
  isModalOpen: boolean
  modalHeight?: number
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

// ...Modalコンポーネントの定義の前に
let modalRoot: HTMLElement | null = null;

const Modal: React.FC<ModalProps> = ({
  level,
  isModalOpen,
  modalHeight,
  setIsModalOpen,
}) => {
  const [startY, setStartY] = useState<number>(0)
  const [currentY, setCurrentY] = useState<number>(0)
  const [headerOpacity, setHeaderOpacity] = useState(1) // 通常ヘッダーの透明度

  // 2階層目のモーダル
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false) // 2階層目のモーダルの状態
  const [secondModalHeight, setSecondModalHeight] = useState(0) 

  const modalRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // フッターの高さを取得してモーダルの marginBottom に設定
    if (footerRef.current && modalRef.current) {
      const footerHeight = footerRef.current.offsetHeight
      modalRef.current.style.marginBottom = `${footerHeight}px`
    }
  }, [isModalOpen])

  useEffect(() => {
    if (typeof document !== "undefined") {
      modalRoot = document.getElementById("modal-root") || document.body
    }
  }, [])

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCloseModal()
    }
  }

  const handleSecondModal = () => {
    setSecondModalHeight(
      modalRef.current
        ? modalRef.current.offsetHeight - FOOTER_BOTTOM - (20 * (level + 1))
        : 500
    )

    setIsSecondModalOpen(true)
  }

  const handleTouchStart = (e: TouchEvent) => {
    if (headerOpacity === 0) {
      // ヘッダーが非表示の場合、処理を終了
      return
    }
    setStartY(e.touches[0].clientY)
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (headerOpacity === 0) {
      // ヘッダーが非表示の場合、処理を終了
      return
    }

    const touchMove = e.touches[0].clientY
    const deltaY = touchMove - startY

    // 上にスワイプした場合、処理を終了
    if (deltaY < 0) return

    setCurrentY(deltaY)
    if (modalRef.current) {
      modalRef.current.style.overflow = "hidden"
      modalRef.current.style.transition = "none"
      modalRef.current.style.transform = `translateY(${currentY}px)`
    }
  }

  const handleTouchEnd = () => {
    if (!modalRef.current) return // modalRef.currentがnullの場合、処理を終了
    if (headerOpacity === 0) {
      // ヘッダーが非表示の場合、処理を終了
      return
    }

    modalRef.current.style.overflow = "auto"

    const modalHeight = modalRef.current.offsetHeight
    if (currentY <= modalHeight / 2) {
      // モーダルの高さの半分以下の場合、元の位置に戻す
      modalRef.current.style.transition = "transform 0.3s ease-in-out"
      modalRef.current.style.transform = "translateY(0)"
      setCurrentY(0)
      setTimeout(() => {
        if (modalRef.current) {
          modalRef.current.style.transition = "none"
          modalRef.current.style.transform = "none"
        }
      }, 300)

      return
    }

    // モーダルの高さの半分以上スワイプした場合
    modalRef.current.style.transition = "transform 0.3s ease-in-out"
    modalRef.current.style.transform = "translateY(50px)" // 上に少しスワイプ

    setTimeout(() => {
      if (modalRef.current) {
        modalRef.current.style.transform = "translateY(100%)" // 下にスワイプして閉じる
      }
      setTimeout(handleCloseModal, 300) // 0.3秒後に閉じる
    }, 300)

    setCurrentY(0)
  }

  // スクロールイベントのハンドラー
  const handleScroll = () => {
    if (modalRef.current) {
      const scrollY = modalRef.current.scrollTop // スクロール位置を取得
      const opacity = Math.max(1 - scrollY / 50, 0) // 50ピクセルスクロールで完全に透明に

      setHeaderOpacity(opacity)
    }
  }

  return modalRoot
    ? ReactDOM.createPortal(
        <>
          {isModalOpen && (
            <div
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                zIndex: 1000,
                width: "auto",
                height: "auto",
                backgroundColor: "rgba(0,0,0,0.3)",
              }}
              onClick={handleBackgroundClick}
            >
              {/* モーダル本体 */}
              <div
                ref={modalRef}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onScroll={handleScroll}
                style={{
                  ...modalStyle,
                  boxShadow: `0 -${level * 2}px ${level * 5}px rgba(0, 0, 0, ${
                    level * 0.1
                  })`,
                  height: modalHeight ? `${modalHeight}px` : "auto",
                }}
              >
                <div
                  style={{
                    padding: "10px",
                    border: "1px solid #ccc",
                    height: "50px",
                    opacity: headerOpacity === 0 ? 1 : headerOpacity,
                    position: headerOpacity === 0 ? "fixed" : "relative",
                    transition: "opacity 0.3s",
                    backgroundColor: "#fff",
                    left: 0,
                    right: 0,
                    borderRadius: "15px 15px 0 0",
                  }}
                >
                  ヘッダー
                  {isModalOpen && level === 1 && (
                    // ...（1階層目のモーダルのコードはそのまま）
                    <button onClick={handleSecondModal}>次のモーダル</button>
                  )}
                </div>
                {/* 固定ヘッダー */}
                {/* {headerOpacity < 1 && (
                <div
                  style={{
                    padding: "10px",
                    border: "1px solid #ccc",
                    height: "50px",
                    position: "fixed",
                    top: -1,
                    opacity: 1 - headerOpacity,
                    transition: "opacity 0.3s",
                    backgroundColor: "#fff",
                  }}
                >
                  ヘッダー
                </div>
              )} */}
                <div style={{ ...contentStyle }}>
                  コンテンツ
                  <br />
                  コンテンツ
                  <br />
                  コンテンツ
                  <br />
                  コンテンツ
                  <br />
                  コンテンツ
                  <br />
                  コンテンツ
                  <br />
                  コンテンツ
                  <br />
                  コンテンツ
                  <br />
                  コンテンツ
                  <br />
                  コンテンツ
                  <br />
                  コンテンツ
                  <br />
                  コンテンツ
                  <br />
                  コンテンツ
                  <br />
                  コンテンツ
                  <br />
                  コンテンツ
                  <br />
                  コンテンツ
                  <br />
                  コンテンツ
                  <br />
                  コンテンツ
                  <br />
                  コンテンツ
                  <br />
                  コンテンツ
                  <br />
                  コンテンツ
                  <br />
                  コンテンツ
                  <br />
                  コンテンツ
                  <br />
                  コンテンツ
                  <br />
                  コンテンツ
                  <br />
                  コンテン
                  <br />
                </div>
              </div>
              {/* 固定フッター */}
              <div ref={footerRef} style={footerStyle}>
                フッター
              </div>
            </div>
          )}
          {/* 次の階層のモーダル */}
          {level === 1 && modalRef.current && (
            <Modal
              level={level + 1}
              isModalOpen={isSecondModalOpen}
              modalHeight={secondModalHeight}
              setIsModalOpen={setIsSecondModalOpen}
            />
          )}
        </>,
        modalRoot
      )
    : null
}

export default Modal
