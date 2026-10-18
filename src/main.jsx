import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import { pages } from './pages.client'
import './index.css'

const root = document.getElementById('root')

const app = (
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App pages={pages} />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
)

// Pre-rendered pages already contain HTML: attach to it instead of replacing it.
if (root.hasChildNodes()) {
  ReactDOM.hydrateRoot(root, app)
} else {
  ReactDOM.createRoot(root).render(app)
}
