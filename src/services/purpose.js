import api from './api'

export default {
	getPurpose : () => api.get('purposes'),
}