import axios from 'axios'

const API = axios.create({
  baseURL: 'https://indiaverse.onrender.com/api',
})

export default API