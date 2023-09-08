import axios from './customize-axios'
const fetchAllUser = (page) => {
  return axios.get(`/api/users?page=${page}`)
}
const fetchPostUser = (user) => {
  return axios.post(`/api/users`, user)
}
const fetchDeleteUser = (id) => {
  return axios.delete(`/api/users/${id}`)
}
export { fetchAllUser, fetchPostUser, fetchDeleteUser }
