import * as constants from './constants'
import recipientService from './../../services/recipient'
import { setHtmlStorage } from '../../services/helper'
import { setAlertStatus } from '../Alert/actions'
import strings from './../../localizations'
 

export function setLoading(loading) {
	return { type: constants.SET_LOADING, payload: { loading } }
}

export function setInitialState() {
	return { type: constants.SET_INITIAL_STATE }
}

export function setRecipients(recipients) {
	return { type: constants.SET_RECIPIENS, payload: { recipients } }
}

export function getRecipients(id) {
	return async(dispatch) => {
		try {
			const response = await recipientService.getRecipients(id)
			setHtmlStorage('accessToken', response.token, 1500)
			if(response.result){
				dispatch(setRecipients(response.result))
			}else{
				if(response.msg !== 'THERE IS NO DATA TO SHOW'){
					dispatch(setAlertStatus(true, 'danger', strings.fail_get_recipient))
					dispatch(setRecipients([]))
					console.log('res = ', response)
				}
			}
		} catch (error) {
			dispatch(setAlertStatus(true, 'danger', strings.fail_get_recipient))
			console.log(error)
		}
	}
}

export function addReipient(payload){
	return async(dispatch) => {
		dispatch(setLoading(true))
		try {
			const response = await recipientService.addRecipient(payload)
			if(response.result){
				setHtmlStorage('accessToken', response.token, 1500)	
				await dispatch(getRecipients(payload.id_user))
				dispatch(setAlertStatus(true, 'success', strings.success_create_recipient))
			}else{
				dispatch(setAlertStatus(true, 'danger', strings.fail_create_recipient))
				console.log('res = ', response)
			}
		} catch (error) {
			dispatch(setAlertStatus(true, 'danger', strings.fail_create_recipient))
			console.log(error)
		}
		dispatch(setLoading(false))		
	}
}


export function deleteRecipient(id, id_user){
	return async(dispatch) => {
		dispatch(setLoading(true))
		try {
			const response = await recipientService.deleteRecipient(id)
			if(response.result){
				setHtmlStorage('accessToken', response.token, 1500)			
				await dispatch(getRecipients(id_user))			
				dispatch(setAlertStatus(true, 'success', strings.success_delete_recipient))
			}else{
				dispatch(setAlertStatus(true, 'danger', strings.fail_delete_recipient))			
				console.log('res = ', response )
			}
		} catch (error) {
			dispatch(setAlertStatus(true, 'danger', strings.fail_delete_recipient))			
			console.log(error)
		}
		dispatch(setLoading(false))		
	}
}