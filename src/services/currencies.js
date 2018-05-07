import api from './api'

export default {
	getCurrencies: () => api.get('currencies'),
	getCurrency: (currency) => api.get(`currencies/byalias/${ currency }`)
}