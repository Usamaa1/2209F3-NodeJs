import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CreatePost from './Post/createPost'
import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>

    <CreatePost></CreatePost>

  </StrictMode>,
)
