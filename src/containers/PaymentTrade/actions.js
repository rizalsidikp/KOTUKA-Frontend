import * as constants from './constants'
import tradingService from './../../services/trading'
import { setHtmlStorage } from '../../services/helper'
import history from './../../history'


export function setLoading(loading) {
	return { type: constants.SET_LOADING, payload: { loading } }
}

export function setInitialState() {
	return { type: constants.SET_INITIAL_STATE }
}

export function setLiveTransaction(liveTransaction) {
	return { type: constants.SET_LIVE_TRANSACTION, payload: { liveTransaction } }
}

export function setInquiry(inquiry) {
	return { type: constants.SET_INQUIRY, payload: { inquiry } }
}

export function getInquiry(id) {
	return async(dispatch) => {
		dispatch(setLoading(true))
		await dispatch(setInitialState())
		try {
			const response = await tradingService.getInquiry(id)
			setHtmlStorage('accessToken', response.token, 1500)			
			dispatch(setInquiry(response.result))
			console.log('res', response)
		} catch (error) {
			console.log(error)
		}
		dispatch(setLoading(false))	
	}
}


export function sentMoney(id) {
	return async(dispatch) => {
		dispatch(setLoading(true))
		await dispatch(setInitialState())
		try {
			const response = await tradingService.sentMoney(id)
			console.log(response)
			if(response.msg === 'challenge payment'){
				setHtmlStorage('accessToken', response.token, 1500)
				history.replace('/dashboard/transaction')
			}
		} catch (error) {
			console.log(error)
		}
		dispatch(setLoading(false))	
	}
}
