import './App.css';
import { BrowserRouter as Browser, Routes, Route, Navigate } from 'react-router-dom';
import ContextProvider from './Context/Context';
// import { useContextData } from './hooks/useContextData';

import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Pages/Login/Login';

function App() {
  const user = false;
  // const { user } = useContextData();
  console.log(user);
  return (
    <div className="App">
      <ContextProvider>
        <Browser>
          <Routes>
            <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Browser>
      </ContextProvider>
    </div>
  );
}

export default App;
