import api from './api'

export default {
	getTransactions: (id) => api.get(`inquiries/initdata/${ id }`),
	getStatuses: () => api.get('statuses')
}