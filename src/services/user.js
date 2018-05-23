import api from './api'

export default {
	getUser : (id) => api.get(`users/${ id }`)
}