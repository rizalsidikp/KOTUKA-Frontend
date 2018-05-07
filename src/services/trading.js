import api from './api'
import config from './../config'

export default {
	getClosestTrade : (payload) => api.get('inquiries/closesttrade', { params : { ...payload } }),
	getRates: () => api.get('latest.json', { baseURL: config.BASE_URL_RATES, params: { app_id: config.RATES_ID } }),
	postTrade: (payload) => api.post('inquiries', { ...payload })
}