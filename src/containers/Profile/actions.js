import * as constants from './constants'
import userService from './../../services/user'
import { setHtmlStorage } from '../../services/helper'

export function setLoading(loading) {
	return { type: constants.SET_LOADING, payload: { loading } }
}

export function setInitialState() {
	return { type: constants.SET_INITIAL_STATE }
}

export function getUser(id) {
	return async(dispatch) => {
		dispatch(setLoading(true))
		try {
			const response = await userService.getUser(id)
			setHtmlStorage('accessToken', response.token, 1500)			
			console.log(response)
		} catch (error) {
			console.log(error)
		}
		dispatch(setLoading(false))
	}
}