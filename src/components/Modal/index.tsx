"use client"
import React, { useState, useRef, TouchEvent, useEffect } from "react"

const modalStyle = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "white",
  maxHeight: "60vh",
  minHeight: "30vh",
  overflow: "auto",
  paddingBottom: "71px", // フッターの高さ分余白を作る
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

const Modal: React.FC = () => {
  const [startY, setStartY] = useState<number>(0)
  const [currentY, setCurrentY] = useState<number>(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [headerOpacity, setHeaderOpacity] = useState(1) // 通常ヘッダーの透明度

  const handleOpenModal = () => {
    setIsModalOpen(true)

    // フッターの高さを取得してモーダルの marginBottom に設定
    if (footerRef.current && modalRef.current) {
      const footerHeight = footerRef.current.offsetHeight
      modalRef.current.style.marginBottom = `${footerHeight}px`
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const modalRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

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

  return (
    <>
      <div>
        <button onClick={handleOpenModal}>モーダルを開く</button>
      </div>
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
        >
          {/* モーダル本体 */}
          <div
            ref={modalRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onScroll={handleScroll}
            style={modalStyle}
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
              }}
            >
              ヘッダー
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
    </>
  )
}

export default Modal
