import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const put = (newObj) => {
  const request = axios.put(`${baseUrl}/${newObj.id}`, newObj)

  return request.then(response => response.data)
}

const del = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)

  return request.then(response => response.data)
}

export default { getAll, create, setToken, put, del }