import loadable from '@loadable/component'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainPage from './routes/MainPage'
import MenuPage from './routes/MenuPage'
import DiaryListPage from './routes/DiaryListPage'
import SavesPage from './routes/SavesPage'
import DiaryPage from './routes/DiaryPage'
// import WritePage from './routes/WritePage'
const WritePage = loadable(() => import('./routes/WritePage'))

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
        <Route path="/diary_list" element={<DiaryListPage />} />
        <Route path="/saves" element={<SavesPage />} />
        <Route path="/@:nickname/:location" element={<DiaryPage />} />
        <Route path="/write" element={<WritePage />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
