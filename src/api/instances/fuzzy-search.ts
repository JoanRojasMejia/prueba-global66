import axios from 'axios'

const fuzzySearchApi = axios.create({
  baseURL: 'http://localhost:3000'
})

export default fuzzySearchApi
