import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import { Route, Routes, useLocation } from 'react-router-dom'
import {ChatBox} from './components/ChatBox'
import Credits from './pages/Credits'
import Community from './pages/Community'
import './assets/prism.css'
import Loading from './pages/Loading'
import { useAppContext } from './context/AppContext'
import {Toaster} from 'react-hot-toast'
import {SignIn} from '@clerk/clerk-react'

const App = () => {

  const {user , loadingUser} = useAppContext();

  const[isMenuOpen, setIsMenuOpen] = useState(false);
  const {pathname}= useLocation();

  if(pathname === '/loading') return <Loading/>

  return (
    <>
    <Toaster/>
    {isMenuOpen && <img src={assets.close_icon} className='absolute top-3 left-3 w-8 h-8 cursor:pointer md:hidden not-dark:invert ' onClick={()=>{setIsMenuOpen(true)}}/>}
    {user?(
      <div className='bg-gradient-to-b from-[#242124] to-[#000000]'>
        
        <div className='flex h-screen w-screen'>
          
          <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen = {setIsMenuOpen}/>
          <Routes>
            <Route path='/' element={<ChatBox />} />
            <Route path='/credits' element={<Credits />} />
            <Route path='/community' element={<Community />} />
            <Route path='/Loading' element={<Loading />} />
            
          </Routes>
        </div>
      </div>
    ):(
      <div className='bg-gradient-to-b from-[#242124] to-[#000000] flex items-center justify-center h-screen w-screen'>
        {/* <Login/> */}
        {/* {console.log("User not logged in")} */}
        <SignIn
        afterSignInUrl="/loading"/>
      </div>
    )}
      
    </>
  )
}

export default App
