import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainPage from './routes/MainPage'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
