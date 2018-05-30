import * as constants from './constants'
import purposeService from './../../services/purpose'
import { setHtmlStorage } from '../../services/helper'
import tradingService from './../../services/trading'

import { setIdCard } from './../Header/actions'

import history from './../../history'
import { setAlertStatus } from '../Alert/actions'


export function setLoading(loading) {
	return { type: constants.SET_LOADING, payload: { loading } }
}

export function setInitialState() {
	return { type: constants.SET_INITIAL_STATE }
}

export function setPurrpose(purpose) {
	return { type: constants.SET_PURPOSE, payload: { purpose } }
}

export function setSelectedPurpose(selectedPurpose) {
	return { type: constants.SET_SELECTED_PURPOSE, payload: { selectedPurpose } }
}

export function setAccounts(accounts) {
	return { type: constants.SET_ACCOUNTS, payload: { accounts } }
}

export function getPurpose(){
	return async(dispatch) => {
		try {
			const response = await purposeService.getPurpose()
			setHtmlStorage('accessToken', response.token, 1500)
			dispatch(setPurrpose(response.result))
		} catch (error) {
			console.log(error)
		}
	}
}


//post trade
export function postTrade(payload) {
	return async(dispatch) => {
		dispatch(setLoading(true))
		try {
			const params = {
				amount: payload.have_amount,
				currency: payload.have_currency,
				preview: false
			}
			const resTotal = await tradingService.getTotalPayment(params)
			await setHtmlStorage('accessToken', resTotal.token, 1500)		
			payload = {
				...payload,
				total_amount_transfer: resTotal.result.total
			}
			const response = await tradingService.postTrade(payload)
			setHtmlStorage('accessToken', response.token, 1500)
			dispatch(setLoading(false))
			console.log(response)
			dispatch(setAlertStatus(true))
			return history.replace({
				pathname: '/dashboard/paymenttrade',
				state: { payment: response.result.id }
			})
		} catch (error) {
			console.log(error)
		}
		dispatch(setLoading(false))
	}
}


export function uploadIdCard(payload) {
	console.log(payload)
	return async(dispatch) => {
		dispatch(setLoading(true))
		try{
			const response = await tradingService.uploadIdCard(payload)
			console.log(response)
			if(response.image){
				dispatch(setIdCard(response.image.url))
				dispatch(setLoading(false))
				return true
			}else{
				dispatch(setLoading(false))
				return false
			}
		} catch (error) {
			console.log(error)
			dispatch(setLoading(false))
			return false
		}
	}
}

export function getAccounts(){
	return async(dispatch) => {
		try {
			const response = await purposeService.getAccounts()
			setHtmlStorage('accessToken', response.token, 1500)
			dispatch(setAccounts(response.result))
		} catch (error) {
			console.log(error)
		}
	}
}

