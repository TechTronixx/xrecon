import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ContextProvider from './Context/Context';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ContextProvider><App /></ContextProvider>
);

