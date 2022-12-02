import './App.css';
import { BrowserRouter as Browser, Routes, Route, Navigate } from 'react-router-dom';
// import ContextProvider from './Context/Context';
// import { useContextData } from './hooks/useContextData';

import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';

function App() {
  const user = false;
  // const { user } = useContextData();
  console.log(user);
  return (
    <div className="App">
      <Browser>
        <Routes>
          <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Browser>
    </div>
  );
}

export default App;
