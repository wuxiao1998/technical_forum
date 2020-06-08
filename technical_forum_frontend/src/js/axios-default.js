import Axios from 'axios'
Axios.defaults.withCredentials=true
Axios.defaults.baseURL='http://localhost:8000/forum'
Axios.defaults.timeout=10000

Axios.interceptors.response.use(
    response => {
        return Promise.resolve(response);      
    },
    error => {
        alert(error.response.data)
      return Promise.reject(error.response)   // 返回接口返回的错误信息
    });