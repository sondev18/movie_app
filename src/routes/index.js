import { Container } from '@mui/material'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Trending from '../pages/Trending/Trending'
import Movies from '../pages/Movies/Movies'
import Series from '../pages/Series/Series'
import Header from '../componets/Header/Header'
import MainLayout from '../Layouts/MainLayout'
import Search from '../pages/Search/Search'

function Router() {
  return (
    <div className='app'>
    <Routes>
        <Route path='/' element={<MainLayout/>} >
            <Route index element={<Trending/>} />
            <Route path='/movies' element={<Movies/>}/>
            <Route path='/series' element={<Series/>}/>
            <Route path='/search' element={<Search/>}/>
        </Route>
    </Routes>
    </div>

  )
}

export default Router