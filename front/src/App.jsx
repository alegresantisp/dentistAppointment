import { useState } from 'react'
import './App.css'
import Home from './views/Home/Home'
import MisTurnos from './views/MisTurnos/MisTurnos';
import NavBar from './components/NavBar/NavBar'
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import Footer from './components/Footer/Footer';
import {Routes, Route} from 'react-router-dom'; 


function App() {

  return (
    <>  
      <NavBar/>

      <div className="main-content">
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/mis-turnos' element={<MisTurnos />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes> 
       
      </div>

      <Footer />
      
    </>
  )
}

export default App
