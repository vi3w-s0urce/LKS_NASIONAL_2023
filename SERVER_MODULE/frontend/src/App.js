import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='/' element={<>blum ada hehe</>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
