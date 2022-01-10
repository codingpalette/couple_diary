import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainPage from './routes/MainPage'
import MenuPage from './routes/MenuPage'
import WritePage from './routes/WritePage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

declare global {
  interface Window {
    kakao: any
  }
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/write" element={<WritePage />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
