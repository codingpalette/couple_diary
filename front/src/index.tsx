import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import GlobalStyles from './assets/css/GlobalStyles'
import axios from 'axios'
import './assets/css/App.css'
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from 'react-query'

axios.defaults.withCredentials = true
axios.defaults.baseURL =
  process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_URL : process.env.REACT_APP_API_URL

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement)
const queryClient = new QueryClient()

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <GlobalStyles />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RecoilRoot>
    </QueryClientProvider>
  </React.StrictMode>,
)
