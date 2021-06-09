import axios from 'axios';

const token = localStorage.getItem('token');


const api  = axios.create({
    baseURL: 'https://api-meme-zendvn-01.herokuapp.com/api',
    headers: {
        Authorization : `Bearer ${token}`,
    }
})

export  default api;