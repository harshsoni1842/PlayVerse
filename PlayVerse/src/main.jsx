import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


// import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements } from 'react-router-dom'
// import TicTecToe from './Games/TicTecToe.jsx'

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<App />}>
//       <Route path='tictectoe' element={<TicTecToe />} />

//     </Route>
//   )
// )
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <RouterProvider router={router} />
//   </StrictMode>,
// )

