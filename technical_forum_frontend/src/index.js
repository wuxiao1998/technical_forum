import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'antd/dist/antd.css'
import Axios from 'axios'
Axios.defaults.withCredentials=true
ReactDOM.render(
   <App></App>,
  document.getElementById('root'),
);