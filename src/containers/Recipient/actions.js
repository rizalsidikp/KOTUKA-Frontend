import * as constants from './constants'
import recipientService from './../../services/recipient'
import { setHtmlStorage } from '../../services/helper'
 

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
				dispatch(setRecipients([]))
			}
		} catch (error) {
			console.log(error)
		}
	}
}

export function addReipient(payload){
	return async() => {
		try {
			const response = await recipientService.addRecipient(payload)
			setHtmlStorage('accessToken', response.token, 1500)			
			console.log(response)
		} catch (error) {
			console.log(error)
		}
	}
}


export function deleteRecipient(id){
	return async() => {
		try {
			const response = await recipientService.deleteRecipient(id)
			setHtmlStorage('accessToken', response.token, 1500)			
			console.log(response)
		} catch (error) {
			console.log(error)
		}
	}
}