import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthProviderWrapper } from './contexts/Auth.context.jsx'
import { CartProviderWrapper } from './contexts/Cart.context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProviderWrapper>
      <BrowserRouter>
        <CartProviderWrapper>
          <App />
        </CartProviderWrapper>
      </BrowserRouter>
    </AuthProviderWrapper>
  </StrictMode>
)
