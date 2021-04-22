import axios from 'axios';

const api  = axios.create({
    baseURL: 'http://api-meme-zendvn-01.herokuapp.com/api'
})

export  default api;