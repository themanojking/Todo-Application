import React from 'react';
import Signup from './Authenticates/Signup';
import Signin from './Authenticates/Signin';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/signin' element={<Signin />}></Route>
      </Routes>
      <ToastContainer />
     </BrowserRouter>
    </>
  )
}

export default App
