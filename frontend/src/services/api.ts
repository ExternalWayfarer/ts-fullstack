import axios from 'axios';

const api = axios.create({
baseURL: 'http://backend:3000', //URL бэка

})

export default api;