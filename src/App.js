import React,{useState,createContext} from 'react'
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Registerpage from './components/userpage/Registerpage'
import Navbar from './components/Navbar/Navbar'
import Login from './components/userpage/Login.js'
import MyProfile from './components/MyProfile'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Not from './components/Navbar/Not.js'
export const store=createContext()
const App = () => {
  const [token,setToken]=useState(null) 
  return (
    <div>
    <store.Provider value={ [token,setToken]}>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Registerpage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/myprofile' element ={<MyProfile/>}/>
        <Route path='*' element={<Not/>}/>
      </Routes>
      <ToastContainer/>
      </BrowserRouter>
    </store.Provider>
    </div>
  )
}

export default App