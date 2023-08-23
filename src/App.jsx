import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './pages/layout'
import Home from './pages/home'
import context from './context'
import { useTranslation } from 'react-i18next'
import { Toaster } from 'react-hot-toast'
import Login from './pages/login'
import Register from './pages/register'
import AuthorById from './pages/authorById'
import Books from './pages/books'
import BookById from './pages/bookById'
import Profile from './pages/profile'




const App = () => {
  const [t, i18n] = useTranslation('global')
  function handleChangeLanguage(lang){
    i18n.changeLanguage(lang)
  }
  const userDatas = JSON.parse(localStorage.getItem('userDatas')) || null;
  const currentLang =JSON.parse(localStorage.getItem('currentLang')) || "uz";
const [currentMode, setCurrentMode] = useState(localStorage.getItem('theme') || "light")
  return (
    <context.Provider value={{userDatas,currentLang, setCurrentMode, handleChangeLanguage,  currentMode}}>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/' index element={<Home/>}/>
          <Route path='/authors/:id' element={<AuthorById/>}/>
          <Route path='/books'  element={<Books/>}/>
          <Route path='/books/:id'  element={<BookById/>}/>
        </Route>
          <Route path='/profile'element={<Profile/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
      <Toaster/>
    </context.Provider>
  )
}

export default App
