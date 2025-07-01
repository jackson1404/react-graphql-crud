import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ApolloProvider } from '@apollo/client'
import client from './apollo/client.js'
import 'flowbite/dist/flowbite.css';
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
    </BrowserRouter>
  
  </StrictMode>,
)
