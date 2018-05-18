import api from './api'
import config from './../config'

export default {
	getClosestTrade : (payload) => api.get('inquiries/closesttrade', { params : { ...payload } }),
	getRates: () => api.get('latest.json', { baseURL: config.BASE_URL_RATES, params: { app_id: config.RATES_ID } }),
	postTrade: (payload) => api.post('inquiries', { ...payload }),
	getTotalPayment : (payload) => api.get('inquiries/totalpayment', { params: { ...payload } }),
	uploadIdCard: (payload) => api.postData('identifications/upload', { ...payload },  { baseURL : config.BASE_URL_IMAGE }),
	sentMoney: (id) => api.post(`inquiries/challengepayment/${ id }`),
	getInquiry: (id) => api.get(`inquiries/${ id }`)
}