import * as constants from './constants'
import userService from './../../services/user'
import countriesService from './../../services/countries'
import { setHtmlStorage } from '../../services/helper'
import { setUser } from '../Header/actions'
import { setAlertStatus } from '../Alert/actions'
import strings from '../../localizations'

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
			if(response.result){
				setHtmlStorage('accessToken', response.token, 1500)
				await dispatch(setUser(response.result))
				if(!response.result.first_and_middle_name || !response.result.phone_code || !response.result.phone || !response.result.address.address || !response.result.address.post_code ){
					if(!localStorage.getItem('secondRegistration')){
						await localStorage.setItem('secondRegistration', 'true')
						await dispatch(setLoading(false))
						location.reload()
					}
				}else{
					if(localStorage.getItem('secondRegistration')){
						await localStorage.removeItem('secondRegistration')
						await dispatch(setLoading(false))					
						location.reload()
					}
				}
			}else{
				dispatch(setAlertStatus(true, 'danger', strings.fail_get_profile))
				console.log('res = ', response)
			}
		} catch (error) {
			dispatch(setAlertStatus(true, 'danger', strings.fail_get_profile))
			console.log(error)
		}
		dispatch(setLoading(false))
	}
}


export function getCountries() {
	return async (dispatch) => {
		try {
			const response = await countriesService.getCountries()		
			if(response.data){
				dispatch(setCountries(response.data))
			}else{
				dispatch(setAlertStatus(true, 'danger', strings.fail_get_country))		
				console.log('res = ', response)
			}
		} catch (error) {
			dispatch(setAlertStatus(true, 'danger', strings.fail_get_country))		
			console.log(error)
		}
	}
}

export function updateProfile(payload, id, photoPayload = null) {
	return async (dispatch) => {
		dispatch(setLoading(true))
		try{
			if(photoPayload){
				const imgRes = await userService.postImage(photoPayload)
				if(!imgRes.image){
					dispatch(setLoading(false))		
					return dispatch(setAlertStatus(true, 'danger', strings.fail_update_photo))
				}
			}
			const response  = await userService.updateUser(payload, id)
			if(response.result){
				setHtmlStorage('accessToken', response.token, 1500)
				await dispatch(	getUser(id))
				dispatch(setAlertStatus(true, 'success', strings.success_update_profile))
			}else{
				dispatch(setAlertStatus(true, 'danger', strings.fail_update_profile))
				console.log('res = ', response)
			}
		}catch (error) {
			dispatch(setAlertStatus(true, 'danger', strings.fail_update_profile))
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
			if(response.wrong_password){
				setHtmlStorage('accessToken', response.token, 1500)
				dispatch(setAlertStatus(true, 'danger', strings.wrong_old_password))
			}else{
				setHtmlStorage('accessToken', response.token, 1500)
				await dispatch(	getUser(payload.id))
				dispatch(setAlertStatus(true, 'success', strings.success_update_password))
			}
		}catch (error) {
			dispatch(setAlertStatus(true, 'danger', strings.fail_update_password))
			console.log(error)
		}
		dispatch(setLoading(false))		
	}
}