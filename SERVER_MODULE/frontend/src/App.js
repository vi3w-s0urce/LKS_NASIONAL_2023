import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Home from './pages/Home';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='login' element={<Login />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;