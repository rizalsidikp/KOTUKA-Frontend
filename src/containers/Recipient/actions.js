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
			console.log(response)
			if(response.result){
				dispatch(setRecipients(response.result))
			}else{
				dispatch(setRecipients([]))
			}
		} catch (error) {
			console.log(error)
		}
	}
}

export function addReipient(payload){
	return async(dispatch) => {
		dispatch(setLoading(true))
		try {
			const response = await recipientService.addRecipient(payload)
			setHtmlStorage('accessToken', response.token, 1500)	
			await dispatch(getRecipients(payload.id_user))
			dispatch(setAlertStatus(true, 'success', strings.success_create_recipient))
		} catch (error) {
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
			console.log('del res', response )
			setHtmlStorage('accessToken', response.token, 1500)			
			await dispatch(getRecipients(id_user))			
			dispatch(setAlertStatus(true, 'success', strings.success_delete_recipient))
		} catch (error) {
			console.log(error)
		}
		dispatch(setLoading(false))		
	}
}