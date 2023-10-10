import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Home from './pages/Home';
import { AuthProvider } from './context/AuthContext';
import Create from './pages/Create';
import Main from './pages/Main';
import { useState } from 'react';

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='login' element={<Login />} />
          <Route path='/' element={<Main uri="Home" />} />
          <Route path='/create' element={<Main uri="Create" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;