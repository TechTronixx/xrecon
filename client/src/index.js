import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ContextProvider from './Context/Context';
import axios from 'axios';

// axios.defaults.baseURL = 'http://192.168.0.102:5000/';
axios.defaults.baseURL = 'https://xrecon.onrender.com/';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Cache-Control'] = 'max-age=31536000';
// axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
// axios.defaults.headers.common['Content-Type'] = 'text/plain';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ContextProvider><App /></ContextProvider>
);

