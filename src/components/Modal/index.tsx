"use client"
import React, { useState, useRef, TouchEvent } from "react"

const modalStyle = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "white",
  maxHeight: "60vh",
  overflow: "hidden",
  marginBottom: "71px", // フッターの高さ分余白を作る
} as const

const headerStyle = {
  padding: "10px",
  borderBottom: "1px solid #ccc",
  height: "50px"
} as const

const contentStyle = {
  padding: "10px",
  maxHeight: "calc(60vh - 100px)", // ヘッダーとフッターの高さを引く
  overflow: "auto",
} as const

const footerStyle = {
  padding: "10px",
  borderTop: "1px solid #ccc",
  position: "fixed",
  height: '50px',
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

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const modalRef = useRef<HTMLDivElement>(null)

  const handleTouchStart = (e: TouchEvent) => {
    setStartY(e.touches[0].clientY)
  }

  const handleTouchMove = (e: TouchEvent) => {
    const touchMove = e.touches[0].clientY
    const deltaY = touchMove - startY

    // 上にスワイプした場合、処理を終了
    if (deltaY < 0) return

    setCurrentY(deltaY)
    if (modalRef.current) {
      modalRef.current.style.transition = "none"
      modalRef.current.style.transform = `translateY(${currentY}px)`
    }
  }

const handleTouchEnd = () => {
  if (!modalRef.current) return // modalRef.currentがnullの場合、処理を終了

  const modalHeight = modalRef.current.offsetHeight
  if (currentY <= modalHeight / 2) {
    // モーダルの高さの半分以下の場合、元の位置に戻す
    modalRef.current.style.transition = "transform 0.3s ease-in-out"
    modalRef.current.style.transform = "translateY(0)"
    setCurrentY(0)
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
            style={modalStyle}
          >
            <div style={headerStyle}>ヘッダー</div>
            {/* スクロール可能なコンテンツ部分 */}
            <div style={contentStyle}>
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
          <div style={footerStyle}>フッター</div>
        </div>
      )}
    </>
  )
}

export default Modal
