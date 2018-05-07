import * as constants from './constants'
import tradingService from './../../services/trading'
import { setHtmlStorage } from './../../services/helper'
 

export function setLoading(loading) {
	return { type: constants.SET_LOADING, payload: { loading } }
}

export function setInitialState() {
	return { type: constants.SET_INITIAL_STATE }
}

export function postTrade(id_user, need_amount, need_currency, currency_rate, have_amount, have_currency, timezone) {
	return async(dispatch) => {
		dispatch(setLoading(true))
		try {
			const payload = {
				id_user,
				need_amount,
				need_currency,
				currency_rate,
				have_amount,
				have_currency,
				timezone
			}
			const response = await tradingService.postTrade(payload)
			setHtmlStorage('accessToken', response.token, 24*3600)
			console.log(response)
		} catch (error) {
			console.log(error)
		}
		dispatch(setLoading(false))		
	}
}