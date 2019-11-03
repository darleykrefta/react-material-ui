import { create } from 'axios'

const http = create({
  baseURL: process.env.API_URL
})

export default http
