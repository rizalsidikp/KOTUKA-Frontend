import * as constants from './constants'
import userService from './../../services/user'
import countriesService from './../../services/countries'
import { setHtmlStorage } from '../../services/helper'
import { setUser } from '../Header/actions'
import { setAlertStatus } from '../Alert/actions'

export function setLoading(loading) {
	return { type: constants.SET_LOADING, payload: { loading } }
}

export function setInitialState() {
	return { type: constants.SET_INITIAL_STATE }
}

export function setCountries(countries) {
	return { type: constants.SET_COUNTRIES, payload: { countries } }
}

export function getUser(id) {
	return async(dispatch) => {
		dispatch(setLoading(true))
		try {
			const response = await userService.getUser(id)
			setHtmlStorage('accessToken', response.token, 1500)
			dispatch(setUser(response.result))
			if(response.result.address === null || response.result.phone === null){
				if(!localStorage.getItem('secondRegistration')){
					localStorage.setItem('secondRegistration', 'true')
					await dispatch(setLoading(false))
					location.reload()
				}
			}else{
				if(localStorage.getItem('secondRegistration')){
					localStorage.removeItem('secondRegistration')
					await dispatch(setLoading(false))					
					location.reload()
				}
			}
			console.log(response)
		} catch (error) {
			console.log(error)
		}
		dispatch(setLoading(false))
	}
}


export function getCountries() {
	return async (dispatch) => {
		try {
			const response = await countriesService.getCountries()		
			dispatch(setCountries(response.data))
		} catch (error) {
			console.log(error)
		}
	}
}

export function updateProfile(payload, id, photoPayload = null) {
	return async (dispatch) => {
		dispatch(setLoading(true))
		try{
			const response  = await userService.updateUser(payload, id)
			if(photoPayload){
				const imgRes = await userService.postImage(photoPayload)
				console.log('img' , imgRes)
			}
			setHtmlStorage('accessToken', response.token, 1500)
			await dispatch(	getUser(id))
			dispatch(setAlertStatus(true, 'success', strings.success_create_post))
			console.log(response)
		}catch (error) {
			console.log(error)
		}
		dispatch(setLoading(false))		
	}
}


export function updatePassword(payload) {
	return async (dispatch) => {
		dispatch(setLoading(true))
		try{
			const response  = await userService.changePassword(payload)
			setHtmlStorage('accessToken', response.token, 1500)
			await dispatch(	getUser(payload.id))
			dispatch(setAlertStatus(true))
			console.log(response)
		}catch (error) {
			console.log(error)
		}
		dispatch(setLoading(false))		
	}
}