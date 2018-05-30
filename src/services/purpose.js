import api from './api'

export default {
	getPurpose : () => api.get('purposes'),
	getAccounts : () => api.get('accounts'),
}