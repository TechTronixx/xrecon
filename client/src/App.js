import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Browser, Routes, Route, Navigate } from 'react-router-dom';
import { useContextData } from './hooks/useContextData';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';

function App() {
  const [isUser, setIsUser] = useState(false);
  const { token, setToken, setUser } = useContextData();

  axios.defaults.headers.common['Authorization'] = token;

  useEffect(() => {
    //Redirect if userToken exists
    let getUser = localStorage.getItem('xrecon-user-token');
    getUser = JSON.parse(getUser);

    if (getUser) {
      setUser(getUser.user);
      setToken(getUser.token);

      setIsUser(true);
    } else {
      setIsUser(false);
    }
  }, [setToken, setUser]);

  return (
    <div className="App">
      <Browser>
        <Routes>
          <Route path="/" element={token ? <Dashboard /> : <Navigate to={"/login"} />} />
          <Route path="/login" element={!token ? <Login /> : <Navigate to={"/"} />} />
          <Route path="/register" element={!token ? <Register /> : <Navigate to={"/"} />} />
        </Routes>
      </Browser>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar="false"
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={3}
        theme="dark"
      />
    </div>
  );
}

export default App;
