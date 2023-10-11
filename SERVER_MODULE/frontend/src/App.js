import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Home from './pages/Home';
import { AuthProvider } from './context/AuthContext';
import Create from './pages/form/Create';
import Main from './pages/Main';
import { useState } from 'react';
import NotFound from './components/NotFound';

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='login' element={<Login />} />
          <Route path='/' element={<Main uri="Home" />} />
          <Route path='/create' element={<Main uri="Create" />} />
          <Route path='/forms/:slug' element={<Main uri="DetailForm" />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;