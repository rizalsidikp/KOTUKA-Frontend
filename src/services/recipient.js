import api from './api'

export default {
	getRecipients : (id) => api.get(`recipients/byuser/${ id }`),
	addRecipient: (payload) => api.post('recipients', { ...payload }),
	deleteRecipient: (id) => api.delete(`recipients/${ id }`)
}