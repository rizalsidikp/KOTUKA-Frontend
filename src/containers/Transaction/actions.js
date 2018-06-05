import * as constants from './constants'
import transactionService from './../../services/transaction'
import { setHtmlStorage } from '../../services/helper'
import { setAlertStatus } from '../Alert/actions'
import strings from '../../localizations'


export function setLoading(loading) {
	return { type: constants.SET_LOADING, payload: { loading } }
}

export function setInitialState() {
	return { type: constants.SET_INITIAL_STATE }
}

export function setIsInquiry(isInquiry) {
	return { type: constants.IS_INQUIRY, payload: { isInquiry } }
}

export function setInquiries(inquiries) {
	return { type: constants.SET_INQUIRIES, payload: { inquiries } }
}

export function setStatuses(statuses) {
	return { type: constants.SET_STATUSES, payload: { statuses } }
}

export function getTransactions(id){
	return async(dispatch) => {
		dispatch(setLoading(true))
		try {
			const response = await transactionService.getTransactions(id)
			if(response.result){
				setHtmlStorage('accessToken', response.token, 1500)
				if(response.result.posted){
					dispatch(setIsInquiry(true))
				}else{
					dispatch(setIsInquiry(false))
				}
				if(response.result.inquiries && response.result.inquiries.length > 0 ){
					dispatch(setInquiries(response.result.inquiries))
				}else{
					dispatch(setInquiries([]))
				}
			}
			else{
				dispatch(setAlertStatus(true, 'danger', strings.fail_get_transaction))
				console.log('res = ', response)
			}
		} catch (error) {
			dispatch(setAlertStatus(true, 'danger', strings.fail_get_transaction))			
			console.log(error)
		}
		dispatch(setLoading(false))
	}
}

export function getStatuses(){
	return async(dispatch) => {
		dispatch(setLoading(true))
		try {
			const response = await transactionService.getStatuses()
			if(response.result){
				setHtmlStorage('accessToken', response.token, 1500)
				dispatch(setStatuses(response.result))
			}else{
				dispatch(setAlertStatus(true, 'danger', strings.fail_get_status))			
				console.log('res = ', response)
			}
		} catch (error) {
			dispatch(setAlertStatus(true, 'danger', strings.fail_get_status))			
			console.log(error)
		}
		dispatch(setLoading(false))
	}
}