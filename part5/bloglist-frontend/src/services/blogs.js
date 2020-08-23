import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null 

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getUserBlog = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (blogData) => {
  const config = {
    headers: { Authorization: token}
  }

  const blog = await axios.post(baseUrl, blogData, config)
  return blog.data
}

const setToken = newToken => {
  token = `bearer ${newToken}`
}

export default { getAll, getUserBlog, create, setToken }