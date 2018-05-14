import * as constants from './constants'
import purposeService from './../../services/purpose'
import { setHtmlStorage } from '../../services/helper'
import tradingService from './../../services/trading'


export function setPurrpose(purpose) {
	return { type: constants.SET_PURPOSE, payload: { purpose } }
}

export function setSelectedPurpose(selectedPurpose) {
	return { type: constants.SET_SELECTED_PURPOSE, payload: { selectedPurpose } }
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

export function pickTrade(
	id_user, need_amount, need_currency, 
	currency_rate, have_amount, have_currency, 
	payment_detail, trade_purpose, total_amount_transfer,
	account_info, first_and_middle_name, last_name,
	description, trade_with, timezone) {
	return async () => {
		const payload = {
			id_user, need_amount, need_currency,
			currency_rate, have_amount, have_currency,
			payment_detail, trade_purpose, total_amount_transfer,
			account_info, first_and_middle_name, last_name,
			description, trade_with, timezone
		}
		const response = await tradingService.postTrade(payload)
		setHtmlStorage('accessToken', response.token, 1500)
		console.log('picker response', response)
	}
}