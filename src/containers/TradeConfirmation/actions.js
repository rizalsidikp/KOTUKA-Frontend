import * as constants from './constants'
import purposeService from './../../services/purpose'
import { setHtmlStorage } from '../../services/helper'
import tradingService from './../../services/trading'

import { setIdCard } from './../Header/actions'

import history from './../../history'
import { setAlertStatus } from '../Alert/actions'
import strings from '../../localizations'


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
			if(resTotal.result){
				await setHtmlStorage('accessToken', resTotal.token, 1500)		
				payload = {
					...payload,
					total_amount_transfer: resTotal.result.total
				}
				const response = await tradingService.postTrade(payload)
				if(response.result){
					await setHtmlStorage('accessToken', response.token, 1500)
					await dispatch(setLoading(false))
					await dispatch(setAlertStatus(true, 'success', strings.success_create_post))
					return history.replace({
						pathname: '/dashboard/paymenttrade',
						state: { payment: response.result.id }
					})
				}else{
					dispatch(setLoading(false))
					console.log('res = ', response)
					return dispatch(setAlertStatus(true, 'danger', strings.fail_create_post))
				}
			}else{
				dispatch(setLoading(false))
				console.log('res = ', resTotal)
				return dispatch(setAlertStatus(true, 'danger', strings.fail_get_total_transfer))
			}
		} catch (error) {
			dispatch(setAlertStatus(true, 'danger', strings.fail_create_post))			
			console.log(error)
		}
		dispatch(setLoading(false))
	}
}


export function uploadIdCard(payload, alert = false) {
	return async(dispatch) => {
		dispatch(setLoading(true))
		try{
			const response = await tradingService.uploadIdCard(payload)
			if(response.image){
				dispatch(setIdCard(response.image.url))
				dispatch(setLoading(false))
				if(alert){
					dispatch(setAlertStatus(true, 'success', strings.success_upload_id_card))
				}
				return true
			}else{
				dispatch(setLoading(false))
				dispatch(setAlertStatus(true, 'danger', strings.fail_upload_id_card))				
				console.log('res = ', response)
				return false
			}
		} catch (error) {
			console.log(error)
			dispatch(setAlertStatus(true, 'danger', strings.fail_upload_id_card))				
			dispatch(setLoading(false))
			return false
		}
	}
}

export function getAccounts(){
	return async(dispatch) => {
		try {
			const response = await purposeService.getAccounts()
			if(response.result){
				setHtmlStorage('accessToken', response.token, 1500)
				dispatch(setAccounts(response.result))
			}else{
				dispatch(setAlertStatus(true, 'danger', strings.fail_get_account))				
				console.log('res = ', response)
			}
		} catch (error) {
			dispatch(setAlertStatus(true, 'danger', strings.fail_get_account))				
			console.log(error)
		}
	}
}

