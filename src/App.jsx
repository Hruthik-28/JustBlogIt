import { useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import authService from './appwrite/auth'
import  { login, logout } from './store/authSlice'
import {Header, Footer} from './components/index'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .catch((error) => console.log(error))
    .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main className='bg-background'>
          <Outlet/>
        </main>
        <Footer />
      </div>
    </div> 
  ): null
}

export default App
