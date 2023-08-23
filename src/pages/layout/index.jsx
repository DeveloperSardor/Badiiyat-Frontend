import React, { useContext } from 'react'
import Header from '../../components/header'
import { Outlet } from 'react-router-dom'
import context from '../../context'

const Layout = () => {
    const contextDatas = useContext(context);
    const currentMode = contextDatas.currentMode;
  return (
    <div className={`layout  ${currentMode == 'dark' ? "dark" : ""}`}>
     <Header/>
     <div className='container '>
     <Outlet/> 
     </div>
    </div>
  )
}

export default Layout
