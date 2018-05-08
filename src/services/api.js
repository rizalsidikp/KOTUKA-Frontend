import axios from 'axios'
import querystring from 'qs'
import config from '../config'

const { BASE_URL } = config

const api = axios.create({
	baseURL: BASE_URL,
	timeout: 10000,
	headers: {
		Accept: 'application/json',
	},
	paramsSerializer: params => querystring.stringify(params),
})

export default {

	/**
   * @param {Sring} url '/path/to/endpoint'
   * @param {Object} json
   * @param {Object} form
  */
	put: (url, form = {}, json = {}) => {
		const token = localStorage.getItem('accessToken')
		api.defaults.headers.Authorization = `jwt ${token}`
		api.defaults.headers.common['Content-Type'] = json ? 'application/json' : 'application/x-www-form-urlencoded'
		const data = querystring.stringify(form) || json
		return api.put(url, data, {
			params: querystring.stringify(form),
			baseURL: config.BASE_URL,
		}).then(response => Promise.resolve(response.data))
			.catch(err => Promise.reject(err))
	},


	/**
   * @param {Sring} url '/path/to/endpoint'
   * @param {Object} param query params
  */
	get: (url, customConfig = {}) =>{
		const token = localStorage.getItem('accessToken')
		api.defaults.headers.Authorization = `jwt ${token}`
		return api.get(url, {
			baseURL: config.BASE_URL,
			...customConfig
		}).then(response => Promise.resolve(response.data))
			.catch(err => Promise.reject(err))
	},


	/**
   * @param {Sring} url '/path/to/endpoint'
   * @param {Object} json
   * @param {Object} form
   * @param {Object} reqConfig  custom config for request
  */
	post: (url, form = {}, json = {}, reqConfig = {}) => {
		const token = localStorage.getItem('accessToken')
		if (token) {
			api.defaults.headers.Authorization = `jwt ${token}`
		}
		api.defaults.headers['Content-Type'] = !form ? 'application/json' : 'application/x-www-form-urlencoded'
		const data = querystring.stringify(form) || json
		return api.post(url, data, {
			params: querystring.stringify(form),
			baseURL: config.BASE_URL,
			...reqConfig,
		}).then(response => Promise.resolve(response.data))
			.catch(err => Promise.reject(err))
	},


	/**
   * Send request with Content-Type multipart/form
   * used to upload file
   * @param {Sring} url '/path/to/endpoint'
   * @param {Object} data
  */
	postData: (url, data = {}) => {
		const token = localStorage.getItem('accessToken')
		api.defaults.headers.Authorization = `jwt ${token}`
		api.defaults.headers['Content-Type'] = 'multipart/form-data'
		api.defaults.timeout = 30000
		const formData = new FormData()
		const keys = Object.keys(data)
		keys.forEach((key) => {
			(data[key] instanceof File)  ?
				formData.append(key, data[key], data[key].name)
				:
				formData.append(key, data[key])
		})
		return api.post(url, formData, {
			baseURL: config.BASE_URL,
		}).then(response => Promise.resolve(response.data))
			.catch(err => Promise.reject(err))
	},


	/**
   * @param {Sring} url '/path/to/endpoint'
  */
	delete: (url) => {
		const token = localStorage.getItem('accessToken')
		api.defaults.headers.Authorization = `jwt ${token}`
		return api.delete(url, {
			baseURL: config.BASE_URL,
		}).then(response => Promise.resolve(response.data))
			.catch(err => Promise.reject(err))
	},
}
