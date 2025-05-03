import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import ProductPage from './productPage.jsx';
// import MyForm from './myForm.jsx';
// import ProductOverview from './productOverview.jsx';
// import MyUseEffect from './MyUseEffect.jsx';
// import MyPost from './posts/myPost.jsx';
// import FilterProducts from './posts/FilterProducts.jsx';
// import DateFilteredPosts from './posts/DateFilteredPosts.jsx';
import ProductSearch from './post/ProductSearch.jsx';
// import EmailForm from './posts/EmailForm.jsx';

// function App(){
//   const [open, setOpen] = useState(false)
//   return (
//    <>
//     <div className="App">
//       <h1 className="text-3xl font-bold underline">
//         Hello world!
//       </h1>
//       <button
//           onClick={() => setOpen(true)}
//           className="mt-4 rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
//         >
//           Show Product Modal
//         </button>
//     </div>
//     <ProductPage  />
//     <ProductOverview open={open} setOpen={setOpen} />
//    </>
//   )
// }

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App />
    <MyForm />
    <MyUseEffect /> */}
    {/* <MyPost></MyPost> */}
    {/* <FilterProducts /> */}
    {/* <DateFilteredPosts /> */}
    <ProductSearch />
    {/* <EmailForm></EmailForm> */}
  </StrictMode>,
)
