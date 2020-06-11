import Axios from 'axios'
Axios.defaults.withCredentials = true
Axios.defaults.baseURL = 'http://localhost:8000/forum'
Axios.defaults.timeout = 20000
//Axios默认配置信息
Axios.interceptors.response.use(
  response => {
    return Promise.resolve(response);
  },
  error => {
    if (error.response)
      alert(error.response.data)
    return Promise.reject(error.response) // 返回接口返回的错误信息
  });