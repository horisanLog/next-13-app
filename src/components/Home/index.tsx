"use client"
import React, { useEffect, useState } from "react"
import Modal from "../Modal"

export const HomeTemplate: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }
  
  useEffect(() => {
    if (isModalOpen) {
      // モーダルが開いているとき、背景のスクロールを無効にする
      document.body.style.overflow = "hidden"
    } else {
      // モーダルが閉じているとき、背景のスクロールを有効にする
      document.body.style.overflow = "auto"
    }

    // コンポーネントがアンマウントされたときに元に戻す
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isModalOpen])
  return (
    <>
      <div>
        <button onClick={handleOpenModal}>モーダルを開く</button>
      </div>
      <Modal
        level={1}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  )
}
