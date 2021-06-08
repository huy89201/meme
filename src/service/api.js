import axios from 'axios';

const token = localStorage.getItem('token');


const api  = axios.create({
    baseURL: 'http://api-meme-zendvn-01.herokuapp.com/api',
    headers: {
        Authorization : `Bearer ${token}`,
    }
})

export  default api;