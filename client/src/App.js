import './App.css';
import { useEffect } from 'react';
import { BrowserRouter as Browser, Routes, Route, Navigate } from 'react-router-dom';
import { useContextData } from './hooks/useContextData';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import PWA from './Utils/PWA';
// import FetchContacts from "./Components/FetchContacts";

import Content from './Components/Content';
import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import ChatBox from './Components/ChatBox/ChatBox';
import AddContact from './Components/AddContact/AddContact';

function App() {
  const { user, token, contactData, setToken, setUser, setContactData } = useContextData();
  axios.defaults.headers.common['Authorization'] = token;

  // const FetchContacts = async (uid) => {
  //   try {
  //     const result = await axios.post("/getContacts", { userID: uid })
  //     console.log(result.data);
  //     if (result.data.status) {
  //       setContactData(result.data.ContactData);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // if (user?.uid && contactData.length === 0) {
  //   FetchContacts(user.uid);
  // }

  useEffect(() => {
    //Redirect if userToken exists
    let getUser = localStorage.getItem('xrecon-user-token');
    getUser = JSON.parse(getUser);

    if (getUser) {
      setUser(getUser.user);
      setToken(getUser.token);
    }

    PWA();
  }, [setToken, setUser]);


  return (
    <div className="App">
      <Browser>
        <Routes>
          <Route element={token ? <Content /> : <Navigate to={"/login"} />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/chat/:username" element={<ChatBox />} />
            <Route path="/addContact" element={<AddContact />} />
          </Route>

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
