import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'https://front-assignment-api.2tapp.cc/api',
  headers: {
    'Content-Type': 'application/json'
  }
})
