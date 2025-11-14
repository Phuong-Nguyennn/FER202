import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { CarProvider } from './context/CarContext'

const rootElement = document.getElementById('root')

createRoot(rootElement).render(
  <React.StrictMode>
    <CarProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CarProvider>
  </React.StrictMode>
)
