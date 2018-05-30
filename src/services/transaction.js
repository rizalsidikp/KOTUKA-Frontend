import api from './api'

export default {
	getTransactions: (id) => api.get(`transactions/initdata/${ id }`),
	getStatuses: () => api.get('statuses')
}