import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'antd/dist/antd.css'
import Axios from 'axios'
Axios.defaults.withCredentials=true
Axios.defaults.baseURL='http://localhost:8000/forum'
Axios.defaults.timeout=10000
ReactDOM.render(
   <App></App>,
  document.getElementById('root'),
);