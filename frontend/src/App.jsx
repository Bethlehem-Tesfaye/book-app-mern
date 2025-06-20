import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import CreateBokk from './pages/CreateBokk'
import DeleteBook from './pages/DeleteBook'
import EditBook from './pages/EditBook'
import ShowBook from './pages/ShowBook'
import './App.css'


const App = () => {
  return (
    <>
        <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/books/create' element={<CreateBokk/>}/>
      <Route path='/books/delete/:id' element={<DeleteBook/>}/>
      <Route path='/books/edit/:id' element={<EditBook/>}/>
      <Route path='books/details/:id' element={<ShowBook/>}/>
    </Routes>

    </>
    
  )
}

export default App