import api from './api'

export default {
	getUser : (id) => api.get(`users/${ id }`),
	updateUser : (payload, id) => api.put(`users/${ id }`, { ...payload })
}