import axios from 'axios'

export default () => {
  let baseURL
  if (process.env.NODE_ENV === 'production') {
    baseURL = ``
  } else {
    baseURL = `http://localhost:5000/api/`
  }

  const instance = axios.create({
    baseURL
  })

  return instance
}
