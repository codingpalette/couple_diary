import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import GlobalStyles from './assets/css/GlobalStyles'
import axios from 'axios'
import './assets/css/App.css'
import { RecoilRoot } from 'recoil'

axios.defaults.withCredentials = true
axios.defaults.baseURL =
  process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_URL : process.env.REACT_APP_API_URL

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement)

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <GlobalStyles />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
)
