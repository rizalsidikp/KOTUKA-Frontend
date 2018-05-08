import * as constants from './constants'
import transactionService from './../../services/transaction'
import firebaseService from './../../services/firebase'
import { setHtmlStorage } from '../../services/helper'

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

export function setIsInquiry(isInquiry) {
	return { type: constants.IS_INQUIRY, payload: { isInquiry } }
}

export function setIsLiveTransaction(isLiveTransaction) {
	return { type: constants.IS_LIVE_TRANSACTION, payload: { isLiveTransaction } }
}

export function setTransactions(transactions) {
	return { type: constants.SET_TRANSACTION, payload: { transactions } }
}

export function getTransactions(id){
	return async(dispatch) => {
		dispatch(setLoading(true))
		try {
			const response = await transactionService.getTransactions(id)
			setHtmlStorage('accessToken', response.token, 1500)
			if(response.result){
				if(response.result.inquiry){
					dispatch(setIsInquiry(true))
					dispatch(setInquiry(response.result.inquiry))
				}else{
					dispatch(setIsInquiry(false))
				}
				if(response.result.transaction && response.result.transaction.length > 0 ){
					if(response.result.transaction[0].transaction_status === 'ON_PROGRESS'){
						const liveTransaction = await firebaseService.getLiveTransaction(response.result.transaction[0].id)
						await dispatch(setLiveTransaction(liveTransaction))
						dispatch(setIsLiveTransaction(true))
					}else{
						dispatch(setLiveTransaction(null))
						dispatch(setIsLiveTransaction(false))						
					}
					dispatch(setTransactions(response.result.transaction))
				}else{
					dispatch(setIsLiveTransaction(false))					
					dispatch(setLiveTransaction(null))
					dispatch(setTransactions([]))
				}
			}
		} catch (error) {
			console.log(error)
		}
		dispatch(setLoading(false))
	}
}