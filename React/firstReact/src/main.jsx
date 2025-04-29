import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import GetPost from './post/getPost'
import './index.css'
import TemporaryDrawer from './post/MyMaterial'
import BasicRating from './MyRating'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    {/* <GetPost></GetPost> */}

    <TemporaryDrawer></TemporaryDrawer>
    <BasicRating></BasicRating>

    <GetPost></GetPost>


  </StrictMode>,
)
