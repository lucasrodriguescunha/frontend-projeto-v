import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/';

axios.defaults.headers.commom['Authorization'] = 'Bearer ' + sessionStorage.getItem('token');
axios.defaults.headers.post['Content-Type'] = 'application/json';