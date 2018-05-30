import api from './api'
import config from './../config'

export default {
	getUser : (id) => api.get(`users/${ id }`),
	updateUser : (payload, id) => api.put(`users/${ id }`, { ...payload }),
	postImage : (payload) => api.postData('avatars/upload', { ...payload }, { baseURL: config.BASE_URL_IMAGE }),
	changePassword: (payload) => api.put('users/modifypassword', { ...payload }),
}